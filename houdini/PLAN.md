# Houdini opening: "The Death of Harry Houdini" (plan)

**Status:** a 12 s preview covers Part 01 and the start of Part 02. The full build (≈ 40 s) waits for "run".

## Inputs

- `assets/audio/narration.mp3`: the user's narration (36.4 s, all eight parts).
- `assets/img/houdini-bed.png` and `houdini-suit.png`: the user's character art. The suit image had a fake checkerboard background baked in, so it was cut out to real transparency.
- Look: matches the character art. Clean black outlines, flat muted fills, soft shading and a light grain. Every set, prop and supporting figure is drawn in code (Canvas 2D) to match.

## Timing (word-level, from a pocketsphinx transcript of the narration)

| Part | Time | Narration anchor | Shots |
|---|---|---|---|
| 01 Death | 0.0–7.1 | "died" at 6.47 | Hospital exterior push-in to the lit window (0–4.15), a match cut into the dim room with the doctor and nurse as silhouettes (4.15–5.45), a pan across glass → pocket watch → handcuffs → the limp hand (5.45–7.1), then black |
| 02 Escapes | 7.7–17.2 | "handcuffs" 12.09 · "straitjackets" 12.79 · "milk cans" 13.68 · "tank" 14.76 | 02A: medium shot of Houdini, then a close-up as the cuffs click open on "getting out" 9.95, "things" 10.39 and "killed" 11.14. Then hard cuts: 02B a straitjacket upside down over the street, 02C a match cut into the milk can (locks snap, water leaks), 02D the water torture cell, held until 17.2 |
| 03 91 minutes | 17.2–22.7 | "coffin" 19.45 · "swimming pool" 20.5 · "ninety-one minutes" 21.3 · "climbed out" 22.36 | An overhead shot of him lying in the coffin, the lid clangs and bolts tighten (19.5), it sinks underwater into muffled silence, a counter runs 01 → 20 → 45 → 70 → 91 MIN, then the lid opens and he sits up |
| 04 Match cut | 22.7–23.4 | — | His body climbing out matches his body lying in the hospital bed |
| 05 Official cause | 23.4–27.6 | "fifty-two" 24.25 · "ruptured appendix" 26.3 | Pull back from the bed, then a death record with **AGE — 52**, then **RUPTURED APPENDIX** and a clinical torso diagram where the appendix swells and ruptures |
| 06 But… | 27.6–30.9 | "newspapers" 28.44 · "stranger's punch" 29.5–30.1 | Newspapers slam down over the record, presses run and stacks pile up (HOUDINI / PUNCH / DEATH). Then a silhouette reconstruction in the dressing room: the arm pulls back and the frame freezes at impact on "punch" |
| 07 Prophecy | 30.9–33.1 | "prophecy" 32.1 | A séance table with a candle flicker and clippings. A hand places a card and the camera moves to a circled date while the portrait fades into darkness |
| 08 Dig him up | 33.1–36.4 (+ title ≈ 4 s) | "dig him up" 35.46 | Evidence pieces laid out around a photo, a cold morning in the cemetery, a slow track to the grave marker, silence, then black and the title card |

## Audio

- **Narration:** the user's file, unedited.
- **Score:** procedural, in `js/sound.js`:
  - *Still* (hospital): sparse low piano chords and a clock tick.
  - *Tense* (escapes): a pulsing low-string ostinato and faster ticks, building through Part 02.
  - *Silence*: underwater and at the grave.
- **Foley:** cuff clicks and rattles, metal clangs and bolts, bubbles and muffled water, newspaper slams, a printing-press run, a punch hit and a candle.

## Files

- `preview.html` and `js/preview.js` are the preview.
- `js/toon.js` holds the flat-cartoon drawing helpers, camera and finishing.
- `js/player.js` and `tools/export-video.mjs` handle playback and rendering. The exporter launches Chromium with file access so the canvas can be read back when the PNG art loads from disk.
