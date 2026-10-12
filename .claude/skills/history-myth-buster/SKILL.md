---
name: history-myth-buster
description: Make a "history / myth buster cartoon video" for the user's history channel — the flat explainer-cartoon style of the Houdini series (houdini/). Use when the user sends a narration mp3 + script (with [SCENE]/[MAP]/[DOCUMENT]/[TITLE CARD]/[DIAGRAM] notes) and asks for the next video or part in this style, or asks to change/improve this style.
---

# History / Myth Buster cartoon video

The reference build is the 5-part Houdini series in `houdini/` (`out/houdini-opening.mp4`, `houdini-part2…5.mp4`).
The look: flat cartoon sets, thick dark outlines, warm paper props, paper date tag top-left, paper caption strip
bottom-right, slow push-ins, hard cuts, stamps / counters / newspaper slams, blueprint diagrams, expressive posable
characters. Pure JavaScript canvas, deterministic `renderAt(t)`, rendered to MP4 with Playwright + ffmpeg.
Before building, look at a few shots of the reference (`node tools/_stills.mjs part5.html <dir> 0.75`) to match the bar.

## Step 0 — SCRIPT + SOURCE LOG arrive: read everything, then send the ASSET LIST (agreed rule)

The user sends the full script together with its source log (research notes / sources). Before building anything,
read the whole script and the whole log. **All data work is mine:** pull every date, number, name, place and quote from
the log, check each against the script line that says it, and flag anything missing, mismatched or doubtful (with the
log's own wording). Never ask the user to filter text or data. Then reply with one asset list so the build runs smoothly:
1. **Needed from the user** (visual assets only they can supply) — for each item: where it appears (chapter / line),
   *needed* or *nice to have*, and the default if it doesn't come:
   - **Photos / portraits of real named people** who appear on screen (to draw them as cartoon cast in the house style;
     say which ones become silhouettes or name cards instead — people only mentioned, private individuals, victims);
   - **Reference images of key real objects / places / documents** whose exact look matters (a building, a ship, a
     poster, a letter, an artefact). Default: an original flat drawing from public descriptions;
   - **Character art** if a new recurring character is wanted (default: I design one and send a sheet for approval);
   - **The voice-over mp3** (if not sent yet) — everything is timed to it.
2. **What I'll build myself** (one short line): sets, maps + routes, timelines, documents/newspapers with made-up
   mastheads, stamps, counters, diagrams, Theo's acting beats, score + foley.
3. **Engagement plan** (3–5 bullets): the cold-open hook, where Theo appears on camera (open, myth → fact reveals,
   sign-off), the recurring "MYTH / BUSTED" or "FACT ✓" beats, and any shot the script's notes imply that needs a decision.
4. **Data issues** found in the log, and script lines that will need a [MAP]/[DOCUMENT]/[DIAGRAM] even though unmarked.
Then wait for the assets + voice (or "run").

## The working protocol (agreed with the user — follow it every time)

1. **Intake.** Copy the voice into the episode's `assets/` folder. Transcribe and align the narration to the word
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

## Motion rules (locked)

- Every move has a story reason and believable physics: use `FX.settle`, `FX.ring`, `FX.pendulum`, `FX.dropBounce`,
  `FX.approach` (closed-form, in `houdini/js/common.js`). Anticipation before actions, follow-through after.
- No random jitter. Eyes look at what matters (`face.look`), blinks on cues (`blink(t, …times)`).
- Props work like the real thing: locks on hasps, lids lowered by people or hinged correctly, ropes where something
  hangs, papers stamped on the right line, map pins on land not in lakes.

## THEO — the channel guide / myth-buster (approved design target; user brief 2026-10-12)

`G.Guide` in `houdini/js/guide.js` — an original character built from the user's brief sheet (round white face, black
hair, dark suit + tie, black-and-white ink look) but with his own identity: a springy **question-mark curl** on top
(his signature; kick it with `curl: Guide.curlRing(lt - tMove)` after every big move), glossy oval eyes with highlights,
thick acting brows, pink cheeks, **red tie + red pocket square** (his only colour), white one-outline hands, chunky
round shoes, a brass **magnifying glass** prop. Sheet: `out/guide-sheet.png` (`tools/guidesheet.html`, snapped with
`node tools/_snap.mjs <abs path> out/guide-sheet.png 2400 2200`). Demo: `out/guide-demo.mp4` (`guide-demo.html`, `js/guidedemo.js`).
- `Guide.draw(ctx, x, y, s, { t, pose, turn, back, face, talk, walk, lean, headTilt, curl, prop, mirror })`, feet at
  (x, y), s = 1 → ~560 px tall. `turn` −1…1 gives the ¾ views (features slide on the head sphere, far ear and far arm
  tuck behind); `back: true` for the back view. Change `turn` with an ease, never a snap, and kick the curl when he turns.
- Poses (`Guide.pose(t, [[t0,'idle'], [t1,'wave'], …])`, eased with a small overshoot): idle, present, presentL,
  presentBoth, pointUp, pointSide, pointSideL, wave, think, shrug, cheer, thumbsUp, hips, crossed, magnify (+ `prop:
  'magnifier'`), facepalm. Faces: eyes open/wide/happy/closed/squint/wink; brows neutral/up/worried/angry/skeptic/sly;
  mouth grin/smile/open/o/shock/flat/frown/smirk/grit. Auto breathing + blinks; `talk: Guide.talk(t)` lip-syncs to an
  envelope from `biz/tools/envelope.py` when he speaks on camera.
- Use him as the on-screen guide: cold open, myth statement (investigate with the magnifier), the reveal (BUSTED / FACT
  stamp + his reaction), and the sign-off. He stays out of period scenes unless the script asks for a host moment.

## Toolkit (all in `houdini/`)

| File | What it gives you |
|---|---|
| `js/toon.js` | canvas primitives `G.Toon` (shape, rect, circle, smooth, line, grad, cam, glow, fill, renderFrame, ease, prog, lerp, clamp, rng) |
| `js/common.js` | `G.FX`: physics helpers, `fig` (draw a posable character), `dateTag`, `caption`, `stamp`, `bigText`, `paperDoc`, `vignette`, `darkBg`, `push` |
| `js/chars.js` | posable characters `G.Chars`: skeleton + 2-bone IK, outfits, heads, faces, hands (`open`/`fist`/`point`/`steeple`/`none`), `handshake`, `union` |
| `js/cast2.js … cast5.js` | supporting cast (doctor, nurse, mediums, Doyle, Jean, Margery, committee, Rose, Bey, Bess, Ford, Hardeen…). `cast3.js` exports `Chars.castFace` + `Chars.browSet` for building new heads |
| `js/show3.js` | `G.Part3A.lib`: chapter, frame, label, parlour, suite, seanceRoom, newspaper, slam, bubble, ghostIcon, cross, tick, ring, scribble |
| `js/show4.js`, `js/show5.js` | more set pieces to copy: maps + routes, trains, stage, dressing room, couch punch, thermometer, appendix diagram, code decoder, balance scale, marquee |
| `js/guide.js` | THEO, the channel guide (`G.Guide`): posable, turnaround, poses, faces, lip-sync, curl spring, magnifier |
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
- **Asset list first (user, 2026-10-12):** whenever a script + source log arrive, reply with the asset list (Step 0)
  before building — needed / nice-to-have visuals from the user, what I build, the engagement plan, data issues.
- **New character from a brief image:** treat the image as a brief, not a template — keep the requested look (here:
  white face, black hair, dark suit, ink style) and add an original signature (silhouette feature, one accent colour,
  a prop) so the character is recognisable and not a copy. Show a turnaround + poses + expressions sheet and a short
  demo clip before using him in an episode.

