---
name: cinematic-storyboard
description: Turn a narrated history script into a shot-by-shot storyboard for the channel's canvas animation engine — shot list with anchors, sets, time-of-day light, cast, on-screen text, camera moves and music moods — matching the house style (cowboy v9 + the user's repainted Merer look). Use when the user asks for a storyboard, shot list, scene plan, visual plan, "which assets does this script need", or before building a new episode's ep*.js shots.
---

# Cinematic storyboard (script → shot list)

The engine and its house style are documented in `history-myth-buster`, which takes precedence. This skill covers planning the shots before the code is written. Merer works out to about 99 shots for 17 minutes, so one shot runs roughly 6–15 s.

## Output: `houdini/<ep>/storyboard.md`
| # | anchor key / t | VO excerpt | visual (one line) | set + light | cast + pose/face | on-screen text | camera | music / sfx |
|---|---|---|---|---|---|---|---|---|
| 1 | wake / 0.0 | "You wake up on the deck of a boat." | sleeping crew on a moored cargo boat under Tura cliffs | nile · dawn · mist | 40 workers `sleep` | `TURA · JULY · c. 2560 BC` | slow push 1.0→1.06 | nile, ambient |
| 14 | king / 77.2 | "To understand Merer…" | Egypt relief map, the Nile drawn Aswan→Giza | map z .27 | — | chapter 1 banner | drift + zoom | nileQuiet |

## Shot vocabulary (use these words; each maps to existing code)
- **ESTABLISH**: a wide set such as `ES.nile`, `ES.giza`, `ES.cliff`, `ES.jarf`, `ES.town` or `ES.cemetery`, with framing flora on at least one edge.
- **CHARACTER**: a waist-up or full figure (`EP.fig`) with a pose and face that match the line, plus a speech bubble if there's dialogue.
- **CROWD / WORK**: workers pulling, chiselling, carrying, at the right scale for the claim, e.g. "40 men" means about 40 figures.
- **MAP**: the relief map (`ES.map`, `pin`, `route`), with a zoom that starts wide and ends on the place.
- **DOCUMENT**: a papyrus or log card (`EK.logCard`, `papyrusSheet` with hieratic) with the translation typed under it.
- **TITLE CARD**: a parchment chapter banner (`EK.chapter`) laid over a moving set, never over a black screen.
- **DIAGRAM / DATA**: always on `EK.board` (papyrus with a lotus frieze). Use bars, trees, calendars or counters (`EK.count`), and put an "estimate" pill under every estimate.
- **NAME CARD**: the expert's name, role and pronunciation (`EK.nameCard`) the first time they're mentioned.
- **SPLIT / COMPARE**: two panels such as "drag it?" and "float it?", or dry sand and wet sand.
- **STAMP / MYTH**: a red stamp for a verdict ("STILL DEBATED", "MYTH").

## Rules
- **Pick the visual from the VO noun:** show what is said as it's said. Anchor each cut to the noun or verb, not the sentence start.
- **Time of day follows the story clock.** The day-in-the-life chapters run dawn → day → gold → dusk → night, and the light presets (`EP.LIGHT`) must match the sky.
- **Reuse a set at a new angle or light** before building a new one, but don't hold the same composition for more than about 20 s.
- **The repainted-reference look is the default** (see that lesson in `history-myth-buster`): lush palms and bushes framing the edges, soft light beams, painted clouds, reflections, lived-in props, and parchment labels. Never a flat background.
- **Characters:** use the house style (v4 hands with v8 bubbles and posture, upright). Riders need `@ride` outfits. Check limb counts on every new pose.
- **On-screen text** keeps the hedge words from research ("estimate", "approx.", "maybe"). Every label is 7 words or fewer, and only one new label appears at a time.
- **Camera:** gentle push-ins (1.0→1.06–1.08), slow pans, and hard cuts between scenes. Save the big zoom for maps and reveals.
- **Music moods per chapter** come from `score2.js` (nile, nileQuiet, nileWork, …). Mark the stings: stamp, chapter, reveal.

## Workflow
1. Read the script and the research sheet, then list the **asset needs** first: sets, cast, props, maps and documents. This is the "Step 0 asset list" the user expects when they send a new script.
2. Write the storyboard table, and mark the 5–8 **hero shots** (cold open, reveal, twist, legacy, final image). These get the most detail.
3. After the anchors exist, fill in the anchor key and time for every shot.
4. Build the shots, then review: render one still per shot (`tools/_stills.mjs`) and lay them out as a 5×5 contact sheet. Fix the plainest frames first, and repeat until no frame is plain.
