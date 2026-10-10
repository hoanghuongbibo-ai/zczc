---
name: history-myth-buster
description: Make a "history / myth buster cartoon video" for the user's history channel — the flat explainer-cartoon style of the Houdini series (houdini/). Use when the user sends a script + source log (reply first with the ordered asset list), a narration mp3 + script (with [SCENE]/[MAP]/[DOCUMENT]/[TITLE CARD]/[DIAGRAM] notes) and asks for the next video or part in this style, or asks to change/improve this style.
---

# History / Myth Buster cartoon video

The reference build is the 5-part Houdini series in `houdini/` (`out/houdini-opening.mp4`, `houdini-part2…5.mp4`).
The look: flat cartoon sets, thick dark outlines, warm paper props, paper date tag top-left, paper caption strip
bottom-right, slow push-ins, hard cuts, stamps / counters / newspaper slams, blueprint diagrams, expressive posable
characters. Pure JavaScript canvas, deterministic `renderAt(t)`, rendered to MP4 with Playwright + ffmpeg.
Before building, look at a few shots of the reference (`node tools/_stills.mjs part5.html <dir> 0.75`) to match the bar.

## Step 0 — when the user sends the SCRIPT + SOURCE LOG: read it all, then send the asset order (agreed rule)

The user sends the full script with its source log, usually before the voice-over. Read the whole script and the whole
log before replying. **All research and data work is mine:** pull every date, place, number, name and quote from the
log, check each one against the script line that says it, and flag anything missing, mismatched, myth-vs-fact unclear
or uncited. Never ask the user to sort text or data.

Then reply with **one numbered asset order, most important first**, so the build runs smoothly and looks its best.
**"Assets" means visual and research material only** — the user always supplies the script and the voice-over, so
never list those (or the cold open, a sponsor decision, or other script questions) as asset items. An asset is any
photo, image, painting, video clip, newspaper page, document scan, map, poster or other reference/source from the
research that I can't make myself or that makes the shot accurate. Group and order them like this:

1. **Key documents & newspapers** — every `[ARTIFACT]`/`[DOCUMENT]` and every quoted letter, diary, decree, treaty,
   chronicle or front page the script leans on: a scan/photo of the real thing (layout, handwriting, seals, headlines),
   so I recreate it faithfully (made-up masthead per the style rules). Name the exact item and edition/date.
2. **Paintings, prints & old maps** named in the script or showing the period (artist + title), plus the edition the
   user prefers. Public-domain items: say I can fetch them if the network allows.
3. **Photos of people** — each real person on screen, in order of screen time, exact spelling; the portrait to base the
   cartoon on. Say who becomes a silhouette / name card instead (mentioned only, living private people, victims).
4. **Photos of places & objects** — the buildings, rooms, streets, vehicles, machines, costumes and signature props
   the story turns on, as reference so sets and outfits match the period.
5. **Video clips** — archival or news footage of the key events, mainly as motion reference for the animation (how
   the water rose, how the gate swung, how the crowd moved); say if any could be shown as a framed insert and that
   only rights-cleared footage can go on screen.
6. **Data & charts sources** — the tables/graphs behind any number I'll chart (census tables, tide records, budgets),
   when the source log only gives the headline figure.

For each item: where it appears (chapter / script line) and the default I'll use if it doesn't come, so a missing item
never blocks the build. **Deliver the list filtered into 4 boxes (user's format): Needed · PD, Needed · R, Nice · PD,
Nice · R** (PD = public domain, I can fetch it; R = shown on screen only if the user owns the rights — fine to send as
drawing reference either way). Keep one running number per item so the user can reply "sending 1, 11, 24".
Data / facts for charts count as PD (I redraw them). **Every item names its exact place and scope** (which city,
which part of it, which years, which institution) — e.g. "Venice historic centre only, not Mestre / the mainland" —
so the user never has to ask "of which city?". Within each box, keep the category order above.
Add up to three **"make it pop" ideas** for this script (a running counter, a recurring gag, a reveal shot, a
cliffhanger end card). Finish with:
- one short line on what I'll build myself (cartoon cast, sets, diagrams, timelines, stamps, counters, maps, music, sfx),
- the data / fact-check issues found in the source log, each with the line it affects and a suggested fix,
- `[SHOT]` notes I'd add where the script has none, if a long passage would otherwise be static.

Then wait for the assets + voice-over (or "run"). When they come, go to the protocol below.

## The working protocol (agreed with the user — follow it every time)

1. **Intake.** (After Step 0's asset order, when the user sends a script + source log first.) Put supplied assets in
   the episode's `assets/` folder (`img/` for photos and references, slug names). Copy the voice into the episode's `assets/` folder. Transcribe and align the narration to the word
   (see *Voice alignment*). Every cut, stamp, sound effect and acting beat lands on a spoken word.
2. **Plan.** Write `PLAN-<part>.md`: a shot table (anchor phrase → shot → motion beat), new cast, defaults chosen,
   and anything in the script the recording leaves out (say so — e.g. a line the narrator skipped).
3. **Preview / run.** Default: show a ~10 s preview plus a character sheet for any new cast and **wait for "run"**.
   If the user says "run" with the files (they usually do), build straight through without stopping.
   A new series with a new main character: ask for the user's character art (as for Houdini) or design one and get
   the character sheet approved first.
4. **Build → verify.** Render a contact sheet of every shot (`tools/_stills.mjs`) and fix anything unreasonable
   before the full render: overlaps (bubbles/labels over faces), props in impossible places, wrong-facing figures,
   clipped text. Check tricky action shots frame by frame.
5. **Render, deliver.** Render, check audio peaks (~ −1.5 dB), commit + push to the working branch, send the MP4 with
   a summary: what's in it, defaults chosen, anything the user should check by ear.
6. **Learn.** After every video, add new lessons and the user's feedback to the *Lessons* section below (and to the
   style rules if it's a rule), then commit + push this file. This skill is the only memory between sessions.

## Style rules (locked)

- Explainer look of the user's reference clips: flat sets, soft vignette + centre glow, paper date tag top-left, paper
  caption strips, slow push-ins, hard cuts, counters, stamps and slams. Fonts: Fredoka (text) + Luckiest Guy (display),
  both OFL, in `houdini/assets/fonts/`.
- Chapter titles in the script are usually *not* spoken: show them as a paper chapter strip in the pause before the chapter.
- Bracketed script notes (`[MAP]`, `[DOCUMENT]`, `[DIAGRAM]`, `[PORTRAIT]`, `[SCENE]`, `[TIMELINE]`, `[MONTAGE]`) are
  shot instructions — build exactly that shot at that point.
- Main character keeps one identity across all shots (outfits/poses/expressions change; the face does not).
  Supporting cast: original designs in the same style, with faces (or faceless/silhouette when right).
- **No copying** of reference footage, real logos or mastheads. Newspapers get made-up names; a real paper named in
  narration goes in a caption, not as a fake masthead. Real people who are only mentioned can be a silhouette.

- **Bright, vivid, full frames (user feedback, Venice Job one — LOCKED).** The first Venice render was "too dark" and
  too simple. Default now: `window.TOON_FINISH = { grain: .02, vignette: .2 }` on the page; per-shot vignettes at
  ~0.3× (`vig` in `venice/js/job-one.js`); maps, documents and timelines sit on a bright desk (`deskBg`, with props at
  the edges) instead of `FX.darkBg`; outdoor shots use `sceneSky(ctx, top, bot, horizonY, t)` = sun glow + drifting
  clouds + birds + a hazy distant shore with islands (`farLayer`), plus blurred foreground reeds (`reedsFG`); interiors
  get furniture, lamps and light shafts (`scriptorium`, `mosaicWall`, `arcade`). No empty background areas: every
  shot needs a foreground, a middle ground and a background. Final pass: `ffmpeg -vf
  "eq=brightness=0.025:contrast=1.04:saturation=1.22"`.

## Motion rules (locked)

- Every move has a story reason and believable physics: use `FX.settle`, `FX.ring`, `FX.pendulum`, `FX.dropBounce`,
  `FX.approach` (closed-form, in `houdini/js/common.js`). Anticipation before actions, follow-through after.
- No random jitter. Eyes look at what matters (`face.look`), blinks on cues (`blink(t, …times)`).
- Props work like the real thing: locks on hasps, lids lowered by people or hinged correctly, ropes where something
  hangs, papers stamped on the right line, map pins on land not in lakes.

## Toolkit (all in `houdini/`)

| File | What it gives you |
|---|---|
| `js/toon.js` | canvas primitives `G.Toon` (shape, rect, circle, smooth, line, grad, cam, glow, fill, renderFrame, ease, prog, lerp, clamp, rng) |
| `js/common.js` | `G.FX`: physics helpers, `fig` (draw a posable character), `dateTag`, `caption`, `stamp`, `bigText`, `paperDoc`, `vignette`, `darkBg`, `push` |
| `js/chars.js` | posable characters `G.Chars`: skeleton + 2-bone IK, outfits, heads, faces, hands (`open`/`fist`/`point`/`steeple`/`none`), `handshake`, `union` |
| `js/cast2.js … cast5.js` | supporting cast (doctor, nurse, mediums, Doyle, Jean, Margery, committee, Rose, Bey, Bess, Ford, Hardeen…). `cast3.js` exports `Chars.castFace` + `Chars.browSet` for building new heads |
| `js/show3.js` | `G.Part3A.lib`: chapter, frame, label, parlour, suite, seanceRoom, newspaper, slam, bubble, ghostIcon, cross, tick, ring, scribble |
| `js/show4.js`, `js/show5.js` | more set pieces to copy: maps + routes, trains, stage, dressing room, couch punch, thermometer, appendix diagram, code decoder, balance scale, marquee |
| `js/rig.js` | puppet rig of the user's Houdini art (suit portrait, hospital bed) |
| `js/props.js` | handcuffs, chains, watch, glass, car, etc. |
| `js/sound.js` | synthesised score (`moods`: still / tense / mystery / silence / under) + foley `sfx`: click, clang, rattle, whoosh, hit, swell, paper, splash, bubbles, ratchet, creak, scratch, thud, press, slide, wind, boom, window |
| `js/player.js` | page player; `window.renderAt`, `renderSoundtrack`, `READY` |
| `tools/asr.py` | pocketsphinx word-timed transcript |
| `tools/align-partN.py` | script ↔ transcript aligner → `js/timingN.js` (`window.TN` anchors) |
| `tools/export-video.mjs` | `node tools/export-video.mjs <page.html> <out.mp4> 30` (paths relative to `houdini/`) |
| `tools/_stills.mjs` | `node tools/_stills.mjs <page.html> <outDir> 0.75` — one PNG per shot for contact sheets |

A part = `partN.html` (script tags: toon, sound, props, rig, chars, cast*, common, timingN, shared show libs, showN,
player) + `js/timingN.js` + `js/showN.js` (shots keyed to anchors, `cut` list, `sfx`, `moods`, `G.Show`). Copy the
newest part (`part5.html`, `js/show5.js`, `tools/align-part5.py`) as the template. For a **new series**, create a
folder `houdini/<series-slug>/` with its own pages, cast file, narration and `out/`, loading the shared `js/` libs by
relative path; keep series-specific characters out of the shared cast files.

## Setup in a fresh container

```bash
cd houdini && ln -sfn "$(npm root -g)" node_modules     # playwright lives in the global modules
python3 -c "import pocketsphinx"                          # pip install pocketsphinx if missing
```
Chromium: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (launched with `--allow-file-access-from-files`).

## Voice alignment

```bash
S=<scratchpad>
ffmpeg -y -v error -i narration.mp3 -ac 1 -ar 16000 -f s16le $S/v.raw
ffmpeg -i narration.mp3 -af silencedetect=n=-35dB:d=0.25 -f null - 2>&1 | grep -oE "silence_(start|end): [0-9.]+" | awk '{print $2}' | paste - - > $S/sil.txt
python3 tools/asr.py $S/v.raw $S/sil.txt $S/asr.json
python3 tools/align-partN.py $S/asr.json assets/audio/narration-partN.mp3
```
The aligner maps the script to the transcript with difflib and interpolates unmatched words. ANCHORS are
`(key, phrase)` in script order; print the transcript first to see what the narrator actually said.

## Lessons (keep adding)

- **Hands**: draw hand pieces with `Chars.union` (one outline) — separate outlined fingers looked "weird" to the user.
  Use `Chars.handshake` for handshakes; hide the figure's own hand with handShape `'none'` under it.
- **Mirrored figures**: IK targets are in figure space, so a mirrored figure's "toward screen-right" is negative x.
  For a natural elbow-down arm on a mirrored figure set `bendR: 1` / `bendL: -1`; check a still.
- Houdini's art faces screen-left natively; `{ mirror: true }` makes him face right.
- Aligner: phrases keep apostrophes (`"doyle's wife"`, `"didn't"`); numbers need `NUM` entries (e.g. `'1926': 'nineteen twenty six'`).
  The recording may skip or change script lines — compare the transcript and tell the user.
- Stills: grab with `canvas.toDataURL` (element screenshots can repeat a stale frame).
- Audio: renders can peak at 0 dB; re-mux with `-c:v copy -af "volume=-1.5dB,alimiter=limit=0.84:level=false"` and confirm with `volumedetect`.
- GitHub pushes of big MP4 commits sometimes fail with "Internal Server Error"; retry in a background loop every minute.
- Captions/bubbles over faces were the most common contact-sheet fix: put bubbles above heads (y ≈ 80–120) and labels away from figures.
- Reuse earlier self-contained shots when the story revisits them (water cell, casket descent, minute counter,
  hospital room, cemetery, grave) and override the date tag / caption.
- The user asked for "precise, reasonable" motion and called an early generic attempt "amateur": every shot needs a
  motivated action on a word, not just a static picture with a push-in.
- **Asset order = visual/research material only** (user feedback, Venice): the user always provides the script and the
  voice-over, so the first asset order (which listed voice files, the cold open and a sponsor decision) missed the point.
  List photos, paintings, video clips, newspapers, document scans, maps and data sources, each named exactly
  (artist + title, paper + date, archive), with where it's used, needed / nice to have, rights, and a default.
- **Name the place and scope on every asset item** (user feedback, Venice): "1951 census for the old city" and "city
  figures on tourist beds" left the user asking "of which city?". Write "Venice historic centre only (the islands, not
  Mestre / the mainland)", plus years and the institution that publishes it.
- **Check every supplied asset against what was asked** (Venice): of 14 files, 4 were the wrong thing (a 19th-c. English
  diary for Priuli, a generic modern pile infographic, a whole-municipality chart instead of the historic centre, a
  generic tunnel-gate infographic for MOSE). Open each file, say kept / not used and why, save the kept ones in
  `assets/img/` with slug names, log it in the episode's `ASSETS.md`, and give the default for each gap. Wikimedia is
  blocked by this environment's network policy unless the user allows it, so PD scans must come from the user.
- **Venice series** lives in `houdini/venice/` (page `sample-job-one.html`, cast `js/cast-venice.js`: the monk
  `chronicler` who tells the "official" legend, and `Venice.lagoon` — the water as a character that wears a hat per job,
  `Venice.hats.helmet` for job one). Export with paths relative to `houdini/` (`venice/…`); `tools/_at.mjs` takes paths
  relative to the repo root (`houdini/venice/…`). Mirrored figures: `face.look` x is flipped too (+x = screen-left).
- **Venice Job one** (`venice/job-one.html`, `js/job-one.js`, 23 shots, 108.6 s): reusable pieces there — `italyMap`
  (c. 500 map with town/overlay hooks), `lagoonMap` (lagoon with lidi, inlets, shallows, Rivo Alto; `PLACES`),
  `arrowPath`, `flag`, `hut`, `boat`, `amphora`, `fish`, `flames`, `warrior` (silhouette with spear + shield), `walk`
  (walk-cycle feet/hands), `card`, `scriptorium`, `mosaicWall`. More cast in `cast-venice.js`: `cassiodorus`/`roman`,
  `fisher`/`tunicPoor`, `elder`/`tunicElder`, `villagerW`/`dressPlain`, `pepin`/`king`. A recording that already has
  word times from `asr.py` and matches the script can skip the aligner: write the anchors straight into the show file.
- A cloak/`front` layer drawn over the arms hides the hands — keep it to one shoulder when the hands must act.
