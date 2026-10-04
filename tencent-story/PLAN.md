# Tencent story: hand-drawn collage animation (plan)

**Status:** plan and ~14 s preview only. The full build waits for the go-ahead ("run").

> **Style update:** at the user's request, the look moved from doodle collage to a **vintage print-ad collage** (halftone dot printing, aged paper, hard cuts about every 1–2 s with slow push-ins, pasted word strips in retro type, fake newsprint, and a jazzy bed with vinyl crackle). The new engine is `js/print.js`. `preview.html` is the new look and `preview-doodle.html` keeps the first version. The storyboard below still applies; each scene becomes 2–4 quick cuts in the print style.

## Constraints found

| Item | Finding | Consequence |
|---|---|---|
| Repo assets | The repo was empty. There were no images, fonts or audio to reuse. | Every visual is drawn in code: torn paper, ink lines, tape and stamps. No image files are needed. |
| `voice_1.mp3` | This is the **full 15m 12s narration** of the script. | For a 30–60 s cut, short narration excerpts are edited together (see the excerpt map below). |
| Music / SFX | No audio assets are included. | A music-box and pizzicato loop and paper-craft sound effects are generated sample-by-sample in JS (`js/sound.js`). |
| Logos | Riot, Epic, Supercell, Ubisoft, WeChat and the Pentagon are real brands or institutions. | Names appear only as **typewriter labels or ransom-note letters**. No logos are copied. |

## Tech (pure JavaScript, zero dependencies)

- `js/engine.js` draws with Canvas 2D: torn-edge paper cutouts with drop shadows and fibre texture, wobbly ink lines that "boil" at 8 fps (the hand-drawn jitter), pencil hatching, masking tape, ransom-note lettering, typewriter tags, rubber stamps, doodle people, buildings, sun, palms and a horse head.
- `js/sound.js` synthesises the soundtrack: F-major I–vi–IV–V at 100 bpm, music box with pizzicato bass and shaker, plus pop, snip, thud, whoosh, ding, flip and slide-whistle effects at cue times.
- `js/player.js` keeps the canvas clock locked to the audio. `?t=5` renders a still frame.
- `tools/export-video.mjs` renders frames deterministically in headless Chromium and uses ffmpeg to produce the MP4 with mixed audio.
- It opens straight from disk (`index.html`), with no server or build step.

## Full piece: storyboard (target ≈ 55 s, 1280×720)

| # | Time | Narration excerpt (from voice_1.mp3) | Visual |
|---|---|---|---|
| 1 | 0–6 s | "In November 1998, five young men in Shenzhen started a small software company." | Calendar page and **NOV 1998** stamp. The Shenzhen skyline rises and five paper figures pop in. *(This is the preview.)* |
| 2 | 6–10 s | "Their first big product wasn't original. It was a copy." → "The new name was just two letters: QQ." | A photocopier spits out a chat bubble labelled "ICQ". Scissors snip off the "I", a stamp marks it **OICQ**, then the letters crumple and **QQ** pops out as a round penguin-ish paper blob. |
| 3 | 10–16 s | "In 2001, it paid about 32 million dollars for a 46.5% stake in Tencent." + "one of the most successful technology investments ever made" | A paper ship arrives from a hand-drawn South Africa ("NASPERS" tag). A $32M coin stack drops, then a growth line scribbles up off the page to **~$130B**. |
| 4 | 16–24 s | "It paid about 400 million dollars for a 93% stake in Riot." / "It invested 330 million dollars in Epic Games" / "Fortnite" | A collage world map. A paper hand slides cheques across to tagged studio buildings (Los Angeles "RIOT", North Carolina "EPIC"), each with a price stamp. |
| 5 | 24–31 s | "Riot is still Riot. Epic is still Epic. Supercell is still Supercell. The empire is built out of other people's brands." | Three game boxes with their own name tags. A tiny Tencent penguin tag hides behind each one and peeks out on each line. Zoom out to a quilt of studio tags (Supercell, Ubisoft, Paradox, Krafton…). |
| 6 | 31–36 s | "But there was a problem. Two of them, actually. One in Beijing. And one in Washington." | The page tears down the middle. The left half turns red with a Beijing tag and the right half turns navy with a Washington tag. A thunder scribble appears. |
| 7 | 36–42 s | "It called online games 'spiritual opium.'" / "only from 8 to 9 p.m., and only on Fridays, weekends…" | A newspaper cutout headline. A clock doodle locks a gamepad to 8–9 PM and a calendar crosses out Mon–Thu. |
| 8 | 42–48 s | "In January 2025, the Pentagon added Tencent to … the Section 1260H list" / "should Tencent be allowed to keep its stakes in Epic, Riot, and Supercell at all?" | A pentagon-shaped paper clipboard. A "1260H LIST" stamp slams down and a stock line drops (−7.3%). The studio tags wobble on strings. |
| 9 | 48–55 s | "Whether it gets to keep them … It may be decided by two governments." | A tug-of-war between two paper hands (red and navy) over the strings of game tags, with the penguin in the middle. Ends on the ransom title **"WHO OWNS THE GAME?"** and a small "Educational purposes only, not investment advice" label. |

Transitions use torn-paper wipes with a whoosh. Each scene puts a sound cue on the narration's key nouns (stamp = thud, label = snip, reveal = ding).

## Audio plan

- **Narration:** 9–12 excerpts are cut from `voice_1.mp3` with ffmpeg, using 30–60 ms fades at natural pauses and keeping one voice throughout. The preview alignment (found by pause detection) matched the script exactly. For the full cut I'll find excerpts with pocketsphinx forced alignment (its PyPI wheel downloads fine here; Whisper/Vosk model downloads are blocked) and cross-check them against pause detection.
- **Music bed:** the synth loop sits about 10 dB under the voice and swells in the gaps between lines.
- **Output:** `assets/audio/narration-full.mp3` (excerpt edit), `index.html` (interactive player) and `out/tencent-story.mp4`.

## Preview delivered

- `preview.html` is interactive (press Play; it opens from disk).
- `out/preview.mp4` is a 14 s render with narration, music and sound effects.

## Open questions before "run"

1. Should the length be ~55 s (as planned) or closer to 30 s? A 30 s cut would drop scenes 7 and 8.
2. Should "Tencent" be shown as a paper penguin mascot? It's whimsical, but it hints at their mascot. The alternative is a plain "TENCENT" ransom tag.
3. Should the full cut keep the "Pony / Ma = horse" beat? It's charming but costs about 5 s.
