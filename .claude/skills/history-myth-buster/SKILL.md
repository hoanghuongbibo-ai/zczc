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

## Companion skills (the full pipeline)
1. `historical-research`: fact sheet (claims, sources, hedges, pronunciations).
2. `historical-storytelling`: the script.
3. `documentary-voiceover`: speakable VO, recording spec, mp3 → anchors → `timing.js`.
4. `cinematic-storyboard`: shot list and the Step 0 asset list.
5. This skill: build and render the video.
6. `youtube-optimization`: titles, thumbnails, description with chapters, Shorts.

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

## USER RULES — real media, readability, grounding, globe maps (2026-10-26, apply to EVERY video)
1. **Real media first: Wikimedia Commons.** When a shot needs a photo or clip of a specific place, object, document or event, search Wikimedia Commons first (API: https://commons.wikimedia.org/w/api.php). Use only **public domain or CC-BY / CC-BY-SA** files (check `extmetadata.LicenseShortName`). Download into `<ep>/assets/commons/`, record title, author, licence and URL in `<ep>/assets/commons/credits.json`, and **credit them**:
   - a small credit line on screen while the photo shows
   - a full credits roll at the end of the video
   - a `CREDITS.md`
   Don't skimp on images or credits.
2. **Collage look.** Mix real photos into the cartoon: taped polaroids, torn paper and cut-outs over the painted sets, with a slow Ken Burns pan inside each photo. Board/diagram shots never sit on an empty board; give them a collage of real photos plus painted props.
3. **Readable text.** Labels, tags, stamps and cards must never overlap each other, faces or the frame edge (safe margin about 30 px), and must never look blurry or faded. Draw all text after the grade/grain pass (crisp UI layer). Use solid high-contrast colours, e.g. dark ink on cream with a thick outline, or white on solid red. No semi-transparent grunge stamps for important words.
4. **Lively, detailed backgrounds.** No empty or plain frames: add plants, animals (birds, cats, goats, chickens, fish), small props and background people. Every set gets foreground, midground and background detail with motion.
5. **Grounding: nothing floats or flies.** Houses, walls, furniture and props stand on the ground with contact shadows. Never move the set itself up or down to reveal something; move the camera with a clear ground line, or use a cutaway that keeps the ground fixed. Characters enter by walking in, not by rising out of the floor.
6. **Real sound.** Use real recorded sounds (flush, water, crowd, bells, rain, from Commons PD/CC-BY audio) where it fits. While a real sound plays, duck or mute the background music so they don't fight.
7. **Maps on a spherical Earth.** Start every map on a 3D globe (orthographic projection, Natural Earth public-domain land data, ocean shading, atmosphere glow), rotate to the region and zoom in, then hand off to the detailed regional map.

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
- **Lip-sync + speech acting (user, Oct '26: "more expressive, lip-sync to the voice").** `python3 tools/visemes.py <narration.mp3> <ep>/js/vis.js 30` → window.VIS (per-frame opening + viseme X/A/E/O/S/M, thresholds adapt to the voice). Pass `vis: Guide.say(t, from, to)` to whoever speaks (null outside their line): the rig draws the viseme mouth (keeps smile/frown corners, lip colour), nods on syllable onsets, lifts brows on emphasis, beats the hands with the voice, tilts the head. Theo on camera narrating: `vis: Gd.say(t)`. Every voiced skit line gets a speaker window. Load vis.js after venv.js.
- Painted look reference for westerns: `cowboy/ref/user-*.webp` — golden-hour backlight with long shadows (CS.longShadow), lantern-warm studio with dark vignette, glowing orange sunset grass with dark horizon tree silhouettes, lush day prairie with sun glow + rays, misty moonlit nights. Keep overlays subtle: a white "film flicker" at 24% washed every frame — max ~5%.
- **Acting layer (user: "dialogue stiff, movements rigid — make it polished").** Guide.draw now runs `act(o)` on every figure: idle life for everyone (weight shift, head drift, eye saccades), and while `vis` is set the speaker changes gesture on each spoken phrase (phrase starts from VIS silences; `gestSet` per character, back-out easing; scripted Gd.pose objects get `gestMix` .62 of the gesture), leans/nods on syllables and lifts brows on emphasis; `listen: Guide.say(t, a, b)` of the other speaker makes a listener nod/react. Locked poses (crossed, facepalm, hips, cheer, think…) keep still. `Guide.say` fades in .35 s before and out .55 s after a line (no snapping).
- **Dialogue coverage:** `EP.cover(ctx, lt, [[lt, zoom, fx, fy], …])` eases the camera onto whoever speaks (~1.4–1.6×, keep heads + hats in frame: fy ≈ 400–440), pulls back for reactions; walk-ins with `walkIn` + gait; `cowboy/js/skits.js` re-choreographs skit shots via `EP.R(key, fn)`. show.js adds a gently breathing camera (±3 px).
### Lesson: right hand still + speech-following bubbles (cowboy v4)
- Dialogue must follow the voice exactly. Use `EP.mark(ctx, who, x, y, s)` after drawing a speaker, then `EP.speech(ctx, who, line, TV.from, TV.limit, t)`. The bubble appears only while that line is voiced (its end comes from VIS silence), reveals words in step and grows its box with them, has its tail to the speaker, and fades .3 s after. Narrator lines go through `EP.caption`. Never leave stacked or early bubbles, and never put up bubbles for unvoiced text (removed "UP! UP! UP!", "z z z", "BEEF!").

### HOUSE STYLE = cowboy v9: v4 hands + v8 everything else (user's final decision)
- Arms and hands as in v4: the right arm rests still at the side, only the left arm gestures (phrase-driven GSETS, the original palm hand), and props or held poses keep their arm. Don't use the v5 TALK set, the v6 hand redraws, or the v7/v8 hands-behind-the-back pose.
- Everything else as in v8:
  - Bubbles in the reference style (cream card, thick brown outline, drop shadow, small tail), placed ABOVE the speaker's head or beside it in close-ups. Placement picks the spot covering the fewest heads drawn this frame (EP.mark stores the mouth, the head top at ≈625 units, the half-width at ≈215 units, and the frame stamp G.EP.frame set in show.js). Bubbles follow the voice word by word and vanish when the line ends.
  - `G.Guide.straight = true` for an upright body with no lean or sway. The head, face and lip-sync still act.

### Merer's Diary episode (houdini/merer/, Oct '26): narrated "immersive" episode, no skits
- Files:
  - `merer/js/cast.js`: Old Kingdom costumes.
    - Outfits: eWorker (bare chest, linen kilt, barefoot), eScribe (Merer and Ankhhaf: pleated kilt, sash, bead collar), eDress, eGreek (Herodotus), eLab.
    - Hats: wigOK (Old Kingdom bob wig: `behind()` mass + cap with fringe; never an `under:` hat, which would cover the face), kerchief, petasos.
    - Props: papyrus, pen, mallet, jar, bread.
  - `sets.js` (G.ES):
    - nile: far bank layer, live flood water, near bank, optional near cliff or Giza on the far bank.
    - boat: Old Kingdom cargo boat with hogging truss, cobra prow, steering oar, billowing sail, blocks, rowers and sleepers.
    - ew: mini Egyptian worker, poses pull/push/carry/chisel/row/pour/sleep.
    - Also: cliff (Tura), pyramid (k = build level), giza, sphinx, town (Heit el-Ghurab), cemetery, jarf (sealed galleries), museum, lab, hatnub, chamber, desertRamp, sledge, and an Egypt map with toS/route/pin.
  - `kit.js` (G.EK): hieratic squiggles, papyrus sheet, logCard (hieratic writes itself, then the translation types), onScreen strip, chapter strip, nameCard (real people without faces), timeline, onions, tombPainting, sandDiagram, rampTypes, gangChart, workforce, calendar, timesheet, graffiti, bonesCard, count (decimal counter).
- Score: new moods nile / nileQuiet / nileWork in score2.js, in a D hijaz colour.
- Living real people (Hawass, Lehner, Tallet, Sheisha, Bonn, Redding) appear only as name cards. Chapter 11 (the cost) has no characters and no jokes, as the script asked.
- Gotchas:
  - Anchor keys must be unique ("away" was used twice and silently moved a cold-open shot to 11 minutes). Check with `cut -d'|' -f1 anchors.txt | sort | uniq -d`.
  - The map canvas must cover the whole view: fill outside the canvas with the land colour.
  - P2.pebbles takes `cols: [...]`, not `col`. pcloud tones are day/grey/warm/dusk.

### Lesson: "Merer repainted refs" look (user's 12 repainted frames, `houdini/merer/ref/user-01..12.jpg`)
The user repainted Merer frames and asked that every frame look like those. What made the difference:
- **Lush flora everywhere**: `merer/js/flora.js` (G.EF) has a big painted date palm (with dates), acacia, `bushMass` (scalloped leaf clumps in 4 tones), papyrus, lilies, flowers, ibis/egret, feluccas, flocks, sparkles. Frame every outdoor shot with a foreground bush and palm on one or both edges, and put haze palms of varied size on the far bank.
- **Soft god-ray `beams`** instead of P.rays sunbursts. Use a blue→pink→peach "gold" sky and painted cumulus clouds.
- **Water**: the far bank is mirrored as a reflection, with a sun path, sparkles and lilies.
- **Props that make a place lived-in**: tents, braziers, standards, baskets, jars, rope coils, carts, scaffolds, rocks, and a carved plinth with a cartouche.
- **Text**: parchment `EK.scroll` labels and a parchment chapter banner with a red ribbon and Georgia serif.
- **Diagrams** never sit on a flat colour. Use `EK.board(ctx, seed)`: a reed-mat table under a big papyrus sheet with a lotus frieze, cached as a layer.
- **Relief map**:
  - deep blue sea with turquoise shallows
  - hill-lump shading (shadow SE, highlight NW), drawn on one offscreen canvas and blurred once; per-stroke `filter` is far too slow on a 5000 px canvas
  - mirror-tiled grain (`P2.grain` tiles are not seamless and show square seams when zoomed)
  - a real Gulf of Suez gap between Egypt and Sinai
  - a brass compass rose
- **Process**: render a 99-shot contact sheet (5×5 per sheet) after every pass and fix the plainest frames first.

### Lesson: mounted riders need the "@ride" outfit twins (3-legs bug, Merer 1990 horse shot)
`Beasts.steed` draws the rider via `G.Guide.draw` with outfit `<name>@ride` and adds one near leg in the stirrup itself. The `@ride` twins (legs `kind: 'none'`, `feet: 'none'`) are only created in `cowboy/js/cast.js`. Any episode that borrows `cowboy/js/beasts.js` without that cast must create the twins itself (see the end of `merer/js/cast.js`). Otherwise the outfit lookup fails, the figure is drawn with both standing legs, and the rider shows three legs.

### Lesson: eye-catching thumbnails (Merer v2, `merer/thumbs.js` + `tools/_thumbs.mjs`)
The user rejected plain "scene + title" thumbnails. They asked for something unique and eye-catching, with a slogan that sums up the whole script.
- **Slogan:** a 2–3 word punchline built on the script's thesis or most surprising true fact, e.g.:
  - "THE PYRAMIDS HAD PAPERWORK"
  - "NOT SLAVES. COWORKERS."
  - "TEAM NAME: DRUNKARDS"

  Don't use a literal title.
- **Look:**
  - The episode scene, lightly blurred (about 2.5 px) and darkened on the text side, with a vignette.
  - A hot sunburst behind the hero.
  - The hero, plus one key prop, as a white-outlined sticker with a drop shadow.
  - Big Luckiest Guy text with a gradient fill and a heavy stroke. Keep it inside x ≥ 40.
  - One short Fredoka pill underneath.
- **Output:** render 3 options so the user can pick one.

### "Where Does It Go?" (toilet history, houdini/toilet/, Oct '26)
A narrated myth-buster with skits. It reuses merer's flora/sets/kit and the vindolanda + merer casts. New pieces:
- **`toilet/js/frame.js`** holds the generic framework:
  - **Shots keyed to transcript lines.** `timing.js` comes straight from `asr.json`: `TV.L<n>` is the first word of line n of `transcript.txt`, and `TW[n][k]` is word k of that line. `S(n, fn, off)` and `R(n[, k])` inside a shot replace the hand-written `anchors.txt` (no misheard keys, no duplicate keys).
  - Speech bubbles (`EP.mark`/`EP.speech`), the refrain stamp (`EP.refrain`), the rule card and labels.
  - `EP.sit(ctx, who, x, seatY, s)` draws seated figures. Every outfit gets an `@sit` twin with a lap, knees and shins toward camera.
- **`toilet/js/cast.js`** adds new outfits (hoodie, plumber, tudor, gown, georgian, frock*, sewerman) and hats (tudorCap, periwig, queenCrown, bowlerT). `toilet/castsheet.html` renders the sheet.
- **`toilet/js/sets.js` + `sets2.js` (G.TS)** have about 17 painted sets, plus a polygon relief-map painter (`TS.map(name, {lon, lat, z})`, `TS.pin`, `TS.mapPt`) for southasia / med / usa. Keep coastlines simple. Lake polygons drawn from memory looked like random shards, so they were dropped.
- **Tone rule:** sections the script marks as serious (Soho 1854, the global sanitation numbers) use music mood 'none' or 'quiet', dimmed sets, and no gags.
- **No sponsor read in the recording:** the bridge went straight to the recap. Bracketed placeholders were read by the narrator as generic lines, so the end card mirrors what was said.
