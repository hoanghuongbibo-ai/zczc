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
   - **Costume / headwear references** for any era Theo visits that the wardrobe doesn't have yet (default: I design it
     from period sources and show it on the sheet);
   - **The voice-over mp3** (if not sent yet) — everything is timed to it.
2. **What I'll build myself** (one short line): sets, maps + routes, timelines, documents/newspapers with made-up
   mastheads, stamps, counters, diagrams, Theo's acting beats, score + foley.
3. **Engagement plan** (3–5 bullets): the cold-open hook, where Theo appears on camera and in which outfit + hat per
   scene (open, myth → fact reveals, sign-off), the recurring "MYTH / BUSTED" or "FACT ✓" beats, and any shot the script's notes imply that needs a decision.
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

## THEO — the channel guide / myth-buster (user brief 2026-10-12, revised the same day)

`G.Guide` (`houdini/js/guide.js`) + his wardrobe (`houdini/js/wardrobe.js`, load it right after guide.js). An original
character from the user's brief sheets: round white face, glossy oval eyes with highlights, thick acting brows, pink
cheeks, white one-outline hands, and a **full rounded black mop of hair like the reference, with three small springy
crown tufts** (kick them with `hair: Guide.hairRing(lt - tMove)` after a turn / jump / slam).
**User rule: no single stray curl or lone strand — if hair is curly, the whole style is curly.**
Sheet: `out/guide-sheet.png` (`tools/guidesheet.html` → `node tools/_snap.mjs <abs path> out/guide-sheet.png 2400 2760`).
Demos: `out/guide-demo.mp4` (myth check), `out/wardrobe-demo.mp4` (time-travel wardrobe, parallax era sets).
- **The outfit follows the script; headwear swaps to fit the setting (user rule).** For every scene pick
  `outfit` (suit = host default, roman, medieval, edo, victorian, egypt, explorer) and `hat` (laurel, galea, hood,
  feltCap, kasa, topHat, flatCap, pith, nemes, crown, or 'none'). A new era → add an outfit/hat to wardrobe.js in the
  same style (cloth shading via `garment()`, a real pattern where the garment has one), show it on the sheet first.
  Keep period details right (kimono crosses left-over-right; real insignia/logos are never copied).
- `Guide.draw(ctx, x, y, s, { t, outfit, hat, pose, turn, back, face, talk, walk, lean, headTilt, hair, prop, mirror, light })`,
  feet at (x, y), s = 1 → ~560 px tall. `turn` −1…1 = ¾ views (ease it, never snap), `back: true` = back view.
- Poses (`Guide.pose(t, [[t0,'idle'], [t1,'wave'], …])`, eased with a small overshoot): idle, present, presentL,
  presentBoth, pointUp, pointSide, pointSideL, wave, think, shrug, cheer, thumbsUp, hips, crossed, magnify (holds the
  magnifier), facepalm, bow. Faces: eyes open/wide/happy/closed/squint/wink; brows neutral/up/worried/angry/skeptic/sly;
  mouth grin/smile/open/o/shock/flat/frown/smirk/grit. Auto breathing + blinks; `talk: Guide.talk(t)` lip-syncs to
  an envelope from `biz/tools/envelope.py` when he speaks on camera.
- Use him as the on-screen guide: cold open, the myth statement (magnifier), the reveal (BUSTED / FACT + reaction),
  era hops (spin → costume puff → new set, see `js/wardrobedemo.js`), sign-off.

## Rich, "4D" visuals (user rule, 2026-10-12)

Every shot must feel deep and lit, not flat paper:
- **Depth pass on characters** — `Guide.draw` does it by default: rim light on the lit side, soft form shadow on the
  far side, contact shadow + a short floor shadow away from the light. Match `light` to the set (`{ x, y, rim, rimA,
  shade, shadeA, cast }`): warm sun from the left in Rome, orange dusk rim from the right in Edo, gas-lamp rim at night.
- **Layered sets with parallax**: sky (fixed) → far layer (blur ≈3 px) → mid layer (blur ≈1) → perspective floor
  whose seams converge to a vanishing point → characters → blurred foreground object; pan the camera so layers move at
  0.15 / 0.5 / 1 / 1.5 speed, plus a slow push-in. Cached layers (`layer(key, w, blur, fn)` in wardrobedemo.js) keep it fast.
- **Living atmosphere** on every set, deterministic: light shafts + dust motes, chimney smoke, falling petals, drifting
  fog, swaying lanterns (`FX.pendulum`), lamp glows with floor reflections.
- Materials get texture: cloth folds, knit, tweed, pleats, wood grain, brick courses — never a bare flat fill on a hero prop.

## SKIT FORMAT — PAINTED LOOK v2 is the default (user's repainted frames, 2026-10-12)

Template: `skit2.html` + `js/skit2.js` → `out/skit2-demo.mp4`. The user repainted my skit frames and asked for videos
"based on images like these, lively and fresh". So for skits:
- `Guide.setTheme('warm')`: peach skin, dark-brown hair, warm brown ink (`'ink'` = the original B&W sheet look).
- Painted sets: sunset sky (blue → peach → gold) + slowly turning god rays, pink/purple clouds that drift, layered
  warm hills with lit ridges, leafy trees (layered leaf clumps, 4 greens) and colourful flower bushes that **sway in the
  wind**, grass + cattails swaying, vase balustrade, perspective stone floor with a light pool, moulded door + fluted
  columns + light beams with dust, a detailed Colosseum (tiers, pilasters, keystones, stone texture).
- **Alive in every shot**: parallax camera drift (layers at 0.12 / 0.3 / 0.6 / 1 / 1.4), birds flapping across, warm
  light motes, a crowd of ~230 people (skin/hair/clothes variety) streaming out of the arches with walking bob and
  a few waving, mouths that flap while each subtitle types on (`talking()`), bouncy walk + hop-to-stop, gestures on
  the line, hair-tuft springs, blinks on the beat.

## SKIT FORMAT (user reference clip 2026-10-12; first demo `out/skit-demo.mp4`, `skit-demo.html`, `js/skitdemo.js`)

A dialogue-driven alternative to the narrated explainer, modelled on the user's reference (a painterly myth-comedy
clip). Use it when the script has dialogue lines / characters talking. Its language:
- **Painterly golden-hour sets**: gradient skies with a sun glow and soft clouds, layered outlined mountains with a lit
  face, stone/marble with gradient columns, diagonal **sun wedges** (blurred light polygons) across walls and floors,
  flowering bushes, grass tufts, blurred foreground foliage/planters. Painter kit in skitdemo.js: `sky, cloud,
  mountains, bush, grass, tree, column, lightWedge`, cached as layers (`layer(key, blur, fn)`).
- **Staging**: wide establishing shot → two-shot → **over-the-shoulder with the foreground figure heavily blurred**
  (`ctx.filter = 'blur(9px)'` around `Guide.draw`) → deadpan close-ups over a blurred background. Hard cuts, slow push-ins.
- **Comedy timing**: slow head turns (back view → ¾), long silent beats, heavy-lidded deadpan (`eyes: 'half'`), one
  slow blink, then the line; embarrassed reactions with `blush` + `sweat`.
- **Our own touch** (not the reference's): Theo in the era outfit; subtitles as a coloured **name tab** (Theo red,
  each cast member their own colour in `NAMES`) over a **cream paper strip** with a quick type-on (`sub()`); the
  **MYTH CARD** insert (paper card on a desk: MYTH line, a mini diagram that animates, the fact lines, BUSTED stamp,
  Theo pointing from the side) at the myth → fact moment.
- Supporting cast lives in `js/skitcast.js` (`Cast.marcus`: original portly Roman senator — bald dome, grey fringe,
  big nose, toga with purple stripes). New cast = `{ outfit, hat, look: { hair: 'mop'|'bald'|'curly', hairCol, nose,
  width, chin, brow, browCol } }`; sheet `out/skit-cast.png` (`tools/skitcast.html`). Never copy the reference's characters.

## Toolkit (all in `houdini/`)

| File | What it gives you |
|---|---|
| `js/toon.js` | canvas primitives `G.Toon` (shape, rect, circle, smooth, line, grad, cam, glow, fill, renderFrame, ease, prog, lerp, clamp, rng) |
| `js/common.js` | `G.FX`: physics helpers, `fig` (draw a posable character), `dateTag`, `caption`, `stamp`, `bigText`, `paperDoc`, `vignette`, `darkBg`, `push` |
| `js/chars.js` | posable characters `G.Chars`: skeleton + 2-bone IK, outfits, heads, faces, hands (`open`/`fist`/`point`/`steeple`/`none`), `handshake`, `union` |
| `js/cast2.js … cast5.js` | supporting cast (doctor, nurse, mediums, Doyle, Jean, Margery, committee, Rose, Bey, Bess, Ford, Hardeen…). `cast3.js` exports `Chars.castFace` + `Chars.browSet` for building new heads |
| `js/show3.js` | `G.Part3A.lib`: chapter, frame, label, parlour, suite, seanceRoom, newspaper, slam, bubble, ghostIcon, cross, tick, ring, scribble |
| `js/show4.js`, `js/show5.js` | more set pieces to copy: maps + routes, trains, stage, dressing room, couch punch, thermometer, appendix diagram, code decoder, balance scale, marquee |
| `js/guide.js` | THEO, the channel guide (`G.Guide`): posable, turnaround, poses, faces, lip-sync, hair spring, magnifier, depth pass |
| `js/wardrobe.js` | THEO's era outfits, legs/feet kinds and headwear (`Guide.OUTFITS`, `Guide.HATS`) |
| `js/score2.js` | NEW score + foley (plucks, marimba, celesta, pads, bass, soft drums; moods curious/adventure/quiet/morning/busy/comic/warm/tender/somber/rising; ducks under the voice via window.VENV). Load it instead of sound.js |
| `js/setprops.js` | period set dressing with outline + light/shade + contact shadow: amphorae (+rack), barrels, sacks, baskets (bread/apples/veg/wool), crates, woodpile, cart, trough, well, hay, washing line, stools, laid table, chest, peg rail (helmets/bags/belts/cloaks), shield + spear racks, scroll basket, lamps, brazier, cauldron, quern, loom, fence, dig tools |
| `js/fauna.js` | animals in the painted style with idle loops: horse (grazing), chicken (pecking), dog (tail wag), sheep, cat, butterfly, duck |
| `js/paint.js` | shared painter kit (sky, rays, drifting clouds, hills, swaying trees/bushes/grass, birds, motes, cached parallax layers) |
| `tools/export-par.mjs` | parallel exporter: N Chromium workers → JPEG pipe → x264 segments → concat + soundtrack + narration (pass the narration path explicitly) |
| `js/skit2.js` | SKIT v2 (default): painted warm look, swaying foliage, drifting clouds, birds, crowd, parallax, talking mouths |
| `js/skitdemo.js`, `js/skitcast.js` | SKIT format: painter kit, OTS blur, name-tab subtitles, Myth Card insert; supporting cast (Marcus) |
| `js/wardrobedemo.js` | parallax era sets (study, Rome, medieval, Edo, London), spin + costume puff, stage line-up |
| `js/rig.js` | puppet rig of the user's Houdini art (suit portrait, hospital bed) |
| `js/props.js` | handcuffs, chains, watch, glass, car, etc. |
| `js/sound.js` | synthesised score (`moods`: still / tense / mystery / silence / under) + foley `sfx`: click, clang, rattle, whoosh, hit, swell, paper, splash, bubbles, ratchet, creak, scratch, thud, press, slide, wind, boom, window |
| `js/player.js` | page player; `window.renderAt`, `renderSoundtrack`, `READY` |
| `tools/asr.py` | pocketsphinx word-timed transcript |
| `tools/align-partN.py` | script ↔ transcript aligner → `js/timingN.js` (`window.TN` anchors) |
| `tools/export-video.mjs` | `node tools/export-video.mjs <page.html> <out.mp4> 30` (paths relative to `houdini/`) |
| `tools/_stills.mjs` | `node tools/_stills.mjs <page.html> <outDir> 0.75` — one PNG per shot for contact sheets |
| `tools/_still.mjs` | `node tools/_still.mjs <episode.html> <outDir> [--clean] name=t …` — lossless 1280×720 stills at chosen times; `--clean` mutes VK/FX text for poster plates (check for empty boxes left behind) |
| `tools/_cutouts.mjs` + `<ep>/cutouts.html`, `thumbs.html` | transparent trimmed character PNGs (Guide.draw at s 2.2 → bbox trim) and sample thumbnails (Luckiest Guy title + Fredoka pill over a clean plate / blurred background) |

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
- **Theo v2 (user feedback, 2026-10-12):** no single curl/stray strand — the hair is a full rounded mop like the
  reference (curly only if the whole style is curly); outfits change with the script and hats fit the setting; the
  visuals must be rich with a "4D" depth feel (depth pass on characters, parallax layered sets, atmosphere).
- **Skit format (user, 2026-10-12):** the user wants videos in the style of their reference clip (painterly dialogue
  skits) but with a unique touch and Theo as the lead; content comes later. Demo approved as the template: build new
  skits from `js/skitdemo.js` (sets, OTS, deadpan beats, name-tab subtitles, Myth Card).
- **Painted look (user, 2026-10-12):** the user sent repaints of the skit frames (warm skin, brown hair, lush sunset
  sets, big crowd) and wants videos like those, lively and fresh → skit2.js is the template; keep everything moving.
- **Vindolanda episode (2026-10-13)** — `houdini/vindolanda/` is the template for a full narrated episode in the painted
  look: `anchors.txt` + `tools_anchor.py` (phrase → time from the pocketsphinx transcript, recognised words only),
  `js/venv.js` (voice envelope for ducking + Theo's mouth when presenting), `js/cast.js` (period costumes, helmets,
  props, per-character skin/hair/beards/updos), `js/kit.js` (mini crowd people, paper cards, quote cards, counters,
  tags, Myth Card, "Somebody wrote that down" sting, tablets), `js/sets.js` (fort in 4 skies, street, barracks, office,
  studio, maps of Britain/Europe, outpost, commander's house, gate, farm, dig), `js/ep0–4.js` (shots by beat:
  `S('anchor', fn)`, `fx()`, `mood()`), `js/show.js` (assembles). Shots start on anchors; inside, `R('key')` = anchor
  time relative to the shot; word-level beats use absolute `t`.
- User asked (2026-10-13): "as lively as skit2 or better", **refined, more vibrant people**, **costumes that match the
  script**, and a **new, fresher music + SFX** → score2.js; cast with per-person skin tones, glossy warm eyes, beards,
  Flavian updos, earrings, armour/period kit; crowds of mini people with walk cycles; something moves in every shot.
- Gotchas: the stock export-video.mjs joins the narration path to `houdini/` — for a sub-folder episode use
  export-par.mjs with the explicit path (or the old Houdini voice gets muxed!). No emoji fonts in headless Chromium:
  draw icons. `layer()` caches by key: never call it with an empty draw function under a real key.
- **Mix (user, 2026-10-13): keep music and foley LOW — "avoid deafening the listener".** score2 defaults now: music
  gain .28 with a .36 duck under speech (≈ −20 dB under the voice, a little louder in pauses); foley on its own bus at
  .32, punchy types (stamp/thud/tuba/splash/hammer/crowd/rain…) tamed further, ducked under speech, soft-clipped.
  Check with the voice-vs-music RMS script before delivering.
- **Colour (user, 2026-10-13): refine supporting characters, backgrounds, flora and fauna.** Brighter warm sets
  (plaster walls, terracotta tile roofs, shutters, flower boxes, potted plants, rugs, lanterns, heather), animals in
  every outdoor set, trees + flowering bushes framing wide shots, refined crowd people (faces, hair, belts, hands,
  dresses), and a global grade (`TOON_POST` in show.js: saturate 1.14, contrast 1.05, soft bloom, warm soft-light).
- Deliver long videos to chat as ≤30 MB parts (the upload limit); the full file goes in the repo (<100 MB).
- **Set dressing (user, 2026-10-13, after Vindolanda v2: "pay attention to the surrounding objects as well").** From
  the next part on, every set gets a props pass before render: period-correct objects around the characters (amphorae,
  baskets, sacks, barrels, tools, writing kit, lamps, hanging cloaks, woodpiles, carts, fences, troughs, washing
  lines), each with ink outline + light/shade, placed to support the story beat, never floating or overlapping faces.
  Check the contact sheet for empty floor/wall areas and fill them with something that belongs there.
- **Reporting (user, 2026-10-13): always tell the user what has been accomplished so far** — a short progress list at
  every delivery (done / in progress / next / what I need from them).

## Progress log
- Houdini series parts 1–5 (houdini/out). Theo (channel guide) + wardrobe + skit format + painted warm look.
- Vindolanda (houdini/vindolanda): full 13:11 episode, v2 delivered 2026-10-13 (quieter mix, richer colour, flora,
  fauna, refined crowds). User: "pretty good, could do better — pay attention to surrounding objects. Move on."
- Vindolanda v3 (2026-10-13): props pass in every set (setprops.js) + softer score (no kick/snap/shaker, lyre-like
  plucks, octave-lower melodies, low-passed buses), gentler foley (boing → harp flick). Measured: music+fx ≈ −21 dB
  under the voice (bed peak −16 dB). Treat these numbers as the new house mix target.
- Vindolanda promo pack: 20 stills with text, 17 clean plates, 17 transparent cut-outs, 2 sample thumbnails in `vindolanda/out/stills/` (zipped ≤30 MB per part for upload). After each episode, offer the user a stills pack.
- When the user asks for images/frames from a video: send each frame as its own PNG via SendUserFile (batches of ~24), NOT zips, contact sheets or thumbnails. `node tools/_shotframes.mjs <episode.html> <outDir>` renders one frame per shot (named shotNN_<time>s.png).
- **Painted look v4 (user's repainted frames, Oct '26 — `vindolanda/ref/user-*.webp`) is the new bar.** Use `js/paint2.js` (G.Paint2, load right after paint.js): `pcloud/clouds2` (white cumulus, lavender belly, outline only on silhouette; replaces P.clouds), `overcast`, `mistyHills` + `haze` (bell-shaped band), `meadow` (brush-stroke grass, cloud shadows, `edge` fn for a natural horizon), `drystone`, `stream` (live), `plaster` + `ivy`, `planks` (grain/knots), `strata` + `pebbles`, `fire`, `lantern`, `bokeh`, `grain`. Show post adds `canvasTex()` overlay (.2) so every frame reads as painted canvas. Rules: no flat fills on big surfaces — every wall/floor/ground/sky gets texture; light sources get glow + motes; phones/screens get metal frame + glass cards over a blurred bokeh room.
- Bump a layer's cache key whenever you change what it draws (layers are cached by key).
- **Cowboy episode (houdini/cowboy/, Oct '26)** reuses Vindolanda's kit.js/cast.js (loaded from ../vindolanda/js) and adds: `cowboy/js/cast.js` (G.CW presets; western outfits with automatic `name@ride` twins; hats stetson*/battered/sombrero/beret/hatShades/kepi/bowler/teddy; props megaphone/lasso/ladle/coffee/plate/cash/newspaper/clapper), `beasts.js` (G.Beasts: longhorn side + face portrait, steed with gaits + Guide rider, mini rider, herd, tumbleweed), `sets.js` (G.CS: prairie variants, movieSet, studio, camp+wagon, river, cowtown, saloon, ranch, cemetery+Ikard stone, grave, rodeo, city, lon/lat trail map with toS/route/pin), `kit2.js` (G.CK: GUNFIGHT COUNTER sign, poster, priceTag, wordCard, newspaper, book, dayBanner, bolt, notes, stink, portrait, filmFrame, crossOut). Western score moods in score2.js: western, trail, campfire, danger, saloon (+ foley moo, hooves, thunder, cough, clap, buzz, whip).
- **Perf lessons:** a canvas `filter` applies to EVERY draw call — never draw many shapes under `filter: blur` (a tree line of leaf clumps took 47 s per layer); draw to an offscreen canvas, then blur once. Text inside cached layers must be built lazily (wrap `layer()` in a function) or the display font isn't loaded yet and signs render in serif. Use `tools/_t1.mjs <page> t1 t2…` (first render vs steady-state ms) before a long render; `tools/_prof.mjs` profiles every shot.
- Push-ins: zoom about a point (translate/scale/translate), not T.cam with fy ≠ 360 (that recentres and leaves a black band).
- ASR: anchors from pocketsphinx words are fine even when names are misheard ("bows i'd urge" = Bose Ikard); the narrator skipped the sponsor bridge — say so in the delivery.