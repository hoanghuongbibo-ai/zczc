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
- **One voice file for the whole script** (Venice): cut each part from it with ffmpeg and prepend a 2 s silent
  chapter pause (`anullsrc` + `concat`) for the paper chapter card, since the narrator doesn't read chapter titles.
  Anchors = full-recording word time − (cut start − 2.0).
- **Re-timing a finished part to a new take**: `venice/js/warp.js` (`warpShow(show, pairs, narration, duration)`)
  draws each new-time frame at the old time through word-matched pairs (difflib on the two `asr.py` transcripts), so
  no shot code changes (`job-one-full.html`, `warp-job-one.js`).
- **No repeated imagery across parts** (user requirement): if a later part revisits a subject already shown (piles),
  change the angle — top-down grid, colour blueprint, construction team, "x-ray" under a landmark — never the same
  cross-section twice. Also check people stand on something solid (the Salute clerk was first drawn in the water) and
  that desks/lecterns sit in front of the person using them.
- **Maps of real coastlines: trace them from longitude/latitude**, not by eye (Venice Job three: the hand-placed
  Mediterranean didn't read as Italy/Greece). `LL([lon, lat])` in `venice/js/job-three.js` maps lon −6..36 / lat 46..30 to
  the frame; MED, ADRI, BLACK, ISL and the Venice→Constantinople LANE are reusable for later parts (Portuguese route,
  quarantine, 1204). User-supplied PD paintings go on screen in a gilt frame with a label, then cross-fade into the cartoon
  version (`e11`, `Show.images`).
- **Tone shifts in the script ([MUSIC: out], "nothing playful")** (Venice, The bill/1204): switch the mood to
  `silence`, stop bounces/stamps/gags, use slow `still()` push-ins, cross-faded tableaux, silhouettes for victims and
  a light warm grain; no gore. Keep the image bright enough (dusky orange, not dark). Return to normal motion only where
  the script brings the music back. Balance scales: the heavier pan must sink (check the sign of the tilt on a still).
- **World map (Europe–Africa–India)** in `venice/js/the-letter.js`: `WL([lon, lat])`, `AFR`/`EUR` reuse the accurate
  Mediterranean points from `job-three.js` MED (land polygons must extend past the frame edge, or the top reads as sea),
  `NEW_ROUTE` (Lisbon → Cape → Calicut), `OLD_ROUTE` (Calicut → Red Sea → Alexandria → Venice), `caravel()`.
- **Glyphs the display font lacks render as junk** (e.g. `€` came out as `<`). Spell currencies out ("6 BILLION EUROS") or check the font's coverage on a still before rendering.
- **Enemies "bouncing off" a defence must stay on the water or ground.** A figure thrown up in an arc reads as floating in the sky. Use boats rocking backwards, a splash ring and a fade.
- **Check the contact sheet at two points in each shot (0.45 and 0.8)**: one shows the build-up state, the other the finished state. Labels above growing bars need to clear the title strip at full height.
- `_stills.mjs` needs its output directory to exist (`mkdir -p` first).
- **Closing part = callbacks, not new imagery.** Return to the cold-open set (reuse its `square()` with `lift/marsh/pave` run backwards so the city "arrives" again), pay off each job hat on the mascot in order, and bring back the early quoted figure (Cassiodorus) beside the image he described. End with one quiet tone-shift shot (night, one lit window, music `silence`) before the bright subscribe shot.
- **Keyframe fractions must use fixed anchors** (`A.marble − A.later`), never two `since()` values subtracted: their difference is a negative constant, which froze the square empty.
- Hats on the lagoon mascot: the life ring needs to sit higher (y − 30) or it covers the eyes; keep the mascot's eyes above y ≈ 680 in every frame.
- **New York series (`houdini/nyc/`).** One voice file for the whole script (`assets/audio/narration-full.mp3`, 855 s; transcript in `assets/audio/asr-full.json`), cut per part like Venice. The cold open ends at 61.5 s.
  The fixed camera is `nyc/js/corner.js`: `G.NYC.corner(ctx, t, {m, freeze, light, grey, crowd, empty, sky})` draws Wall St at Broad looking east (Federal Hall portico on the left, the harbor in the slot at the far end). `m` runs 0 → 1 to sink the city into the 1609 hill, creek and marsh. Reuse it for every era (add era layers as options, don't make new angles). `G.NYC.harbor()` is the mascot: the Venice lagoon with a hue shift (load `../venice/js/cast-venice.js`).
  The obituary counter: a black-bordered "NEW YORK IS FINISHED" notice plus a "COUNT: n" box, which stays off in Beat 8.
- Cutting a part's audio with apad: put `-t` on the INPUT side, or the pad gets truncated (this bit me twice).
- **User feedback (NYC cold open): "the initial image is too simple; add more details so viewers can visualize the setting."** An establishing set must name its place through real, recognisable landmarks and street life, not just generic boxes:
  - the actual buildings: Federal Hall's portico, pediment and Washington statue; the Stock Exchange's columns and giant flag;
  - ground-floor shops with signs, a subway entrance with green globes, security bollards, lamp posts, a steam stack, a food cart;
  - varied commuters (skin tones, hair, hats, phones, coffee) with shadows; taxis, a truck and a bike courier;
  - the far view (river, boats, the opposite shore, a plane);
  - a small "YOU ARE HERE" map on the first shot.
  The same density goes for the past-era version of the set (canoe, herons, oyster beds, rock outcrops, smoke from a hearth).
- **User reference image for the NYC look (2026-10-12): "lively and fresh".** This is the bar for every street set:
  - golden-hour light down the street: a sun glow at the vanishing point; the shade side tinted cool violet and the sun side warm gold; about one window in four lit warm;
  - flags, planters with small trees and flowers, pigeons in flight, curly steam wisps, a parked car;
  - a front row of BIG pedestrians with real faces (eyes, brows, smile, blush), hair styles, caps and glasses, coffee cups, phones, tourist cameras and backpacks.
  Use `G.NYC.walker(ctx, x, y, s, t, v)` for anyone close to camera; keep the bean `person()` only for the far crowd.
- **Before a long render, run `node tools/_scan.mjs <page>`.** It renders every frame and reports exceptions in a couple of minutes. Common cause: a canvas `ellipse`/`arc` radius that reaches 0 or tiny negatives while something animates in, so clamp radii with `Math.max(.5, r)`. Render with `WORKERS=4 node tools/export-video.mjs …`, which is about 4× faster.
- **Check the FIRST frame of every shot as well as the middle and end.** A shot whose content is keyed to a word several seconds in sits empty until then (the NYC "deals" shot was blank for 3.7 s). Start the set dressing at `lt ≈ 0` and key only the reveals to words.
- `cam(ctx, z, fx, fy)` centres fx on screen, so a background must reach `fx − 640/z` on the left. Draw backgrounds as `rect(-500, -300, 2300, 1300)`, never `0..W`.
- **New York sets so far** (`nyc/js/corner.js`): `corner()` (today), `dutchCorner(ctx, t, {wall, grey})` (1650s: palisade along the left, stepped-gable houses, the Heere Gracht canal on the right), `walker()` options (Dutch collar, tall hat, skullcap, sash, peg leg, sword, plain clothes with beads for Lenape), `sil()` silhouettes for tone shifts.
- **User feedback (NYC Beat 3): "the first image is too washed out; some images along the way have errors."** Before sending, review the FINISHED MP4 at one frame every 3 s (`ffmpeg -vf "fps=1/3,scale=400:-1,tile=6x9"`), not only the stills. Things that slipped through:
  - title cards built on a pale glow (use saturated two- or three-stop gradients and keep glows ≤ .45 alpha);
  - zooms that miss the highlighted line of a document (compute the target: screen = T + (line − centre) × zoom);
  - a prop held by nobody (a petition in mid-air);
  - a figure with a sword at the hip AND a raised sword;
  - a building on water with no land under it;
  - the mascot pushed below the frame;
  - labels hidden behind hats.
- **User preference (NYC Beat 3): after a round of fixes, the user preferred the FIRST render.** Lesson: when the user flags one or two problems, fix only those and keep the rest of the look. Don't restyle shots they didn't mention. The first Beat 3 is the official one (`nyc-spark.mp4`, code `the-spark.js`); the fixed pass is kept as `nyc-spark-alt-fixed.mp4` / `the-spark-alt-fixed.js`.

- **Every `since(t,'key')` key must exist in `F`.** A missing key gives NaN, and the element silently never appears (Beat 9's first checkbox tick). Also, don't cut away before the payoff word: check that each shot's last key word falls inside the shot's window.

- **The sponsor bridge is a beat too.** If the voice-over skips the sponsor lines, still deliver that beat as a music-only clip: a "quick break" bumper, a hard cut where the ad goes, then a "Now, where were we?" recap of the story so far. Never silently drop a beat number; NYC Beat 5 was missed this way the first time.

- **Maya series (`houdini/maya/`).** The voice-over is one file (`assets/audio/narration-full.mp3`, 1310.7 s; transcript `asr-full.json`; beat map in `PLAN.md`). The recording skips Beat 5.
  Pages load `../nyc/js/corner.js` (for `walker` and `person`), `../nyc/js/nyc-common.js`, then `js/maya-set.js`, which exports `G.Maya`:
  - `plaza(ctx, t, {tod, thin, drift, doorGlow})` is the series' fixed camera on El Castillo. `tod` runs 0 (night) → 1 (dawn) → 2 (morning).
  - `castillo`, `sky`, `jungle`, `torch` and `crowdBand` are the set pieces it's built from.
  - `vendor()` is the water seller in a huipil, a recurring character; `table()` is her folding table.
  - `mayaMap()` and `site()` draw the map traced from lon/lat; `SITES` holds Tikal, Copán, Palenque, Toniná and the other sites.
  Shared helpers come from `nyc/js/sponsor.js` lines 9–139, copied into each part (strip, tag, counter, deskBg, …).
- **Maps: clip any shading polygon to the land path,** or it spills into the sea. Extend land edges past the frame so no straight cut-off edge shows.
- **User feedback (Maya Beat 2): text in the same colour as what's behind it is invisible.** A green "YOU CAN STAY" stamp on green jungle couldn't be read. Any on-screen word that sits over scenery goes on a paper label (`strip` / `tag`), or gets a colour that contrasts with what's directly behind it. Bare `FX.stamp` and bare `txt` belong only on plain backgrounds (desk, paper, sky). Check each label against its background on the stills.

### Character movement & weather consistency (user feedback, Maya Beat 9)
- Anyone moving left/right across the frame must be drawn **in profile** (`G.Maya.sideWalker` / `vendorSide`, `dir: ±1`), facing the way they travel. Never slide a front-facing walker sideways. Front-facing `N.walker` is only for standing, or walking toward the camera.
- Characters who appear (kings and so on) pop or rise into place rather than sliding in while standing still.
- Bystanders react: their eyes follow the main character (`look:` on `N.walker`), and the nearest ones wave.
- Weather is all-or-nothing: rain covers the whole frame under an overcast sky with clouds edge to edge. The sun only appears after the rain has fully stopped. Night is dark across the whole frame. Never show rain and sunshine together.

### Storybook style (Rome series, `houdini/rome/`, `rome/js/paint.js`): the user's new editing method
The user's reference is **My Favorite Greek Myths [No AI]**; screen clips are in `rome/assets/ref/style-ref-1..4.mp4`. Use this look for Rome and for any later video the user asks to make "in the new style".
- **User's clips and plates (rules from the cold-open review).**
  - **No black edges.** Frame every clip with `clipShot`'s clamped camera (`z`, `cx`, `cy` in clip pixels). It keeps the frame covering the screen and the baked marks (bottom-right sparkle, bottom-left caption) below `maxY`. After a render, check edge rows and columns for black.
  - **Motion must run forward.** Before using a segment, check it in a frame strip. AI clips often show a figure facing one way while sliding the other (moonwalking). Play such a segment in reverse with `seg(key, f1, f0)`, or drop it. Never ping-pong.
  - **One character for the whole film.** Pick one design (Rome: the hooded, bearded monk from `cowfield-cart-crowd`) and drop every shot showing a different version of him (clip A's tunic man, the chibi hauler plates, the chibi "you").
  - **Realistic animals only.** Use the cows and goats from the clip; don't use drawn `cow()`/`goat()` or cartoon-animal plates.
  - **One place, explored.** Build a sequence from one location, with the camera moving between its details as the narration names them. The references are a source to pick from, not a checklist.
- **Look.** Painted backgrounds with real light:
  - golden-hour or blue-to-gold skies with soft cloud bands and shaded cumulus;
  - atmospheric haze on distant hills;
  - long cast shadows and light shafts;
  - dark foliage framing the bottom corners (`framing()`).
  All shapes are cel-shaded (`P.cel`: one shadow tone and one light tone) with **warm brown ink** (`#2b1d16`), not black. Every frame gets a soft-light warm grade, paper grain and a vignette.
- **Characters** (`P.chibi`): big pure-white round heads, tiny line eyes with lids (half-lidded, closed, side-glance, wide), a small mouth, big dark hair, small bodies in tunics and togas. They **act** (sigh, glance, blink, tilt, cross their arms) more than they move. Anyone walking across the frame walks side-on (`dir`).
- **Animals:** a big soft cow (`P.cow`, unimpressed lids for comedy) and goats (`P.goat`).
- **Editing:**
  - fewer, longer shots (3–8 s), each with a slow push or drift (`P.camPush`);
  - **cross-dissolves** between shots (`P.cutList` with a fade per cut);
  - reaction close-ups;
  - a fixed "anchor" shot the story returns to (the Forum: `forum(era)`).
- **Text is quiet.**
  - Lower-left serif captions (`P.caption`, Liberation Serif, since the CDN fonts are blocked here).
  - A teal name-tag subtitle for dialogue (`P.subtitle`).
  - Painted ring seals for LEGEND / MYTH / DEBATED / NEAR-DEATH (`P.seal`).
  - No big sticker strips or bouncy pops.
