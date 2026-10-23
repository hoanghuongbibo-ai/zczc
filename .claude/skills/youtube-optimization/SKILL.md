---
name: youtube-optimization
description: Package a finished history-channel episode for YouTube — title options, eye-catching thumbnails, description with chapters and sources, tags, pinned comment, end screen and Shorts cut-downs — and review retention risks. Use when the user asks for a title, thumbnail, description, chapters/timestamps, tags, SEO, "make it go viral", Shorts, or how to publish an episode.
---

# YouTube optimization (publishing pack)

Deliver everything in `houdini/<ep>/out/publish/`: `titles.md`, `description.txt`, `thumbs/thumb-N.png` and `shorts/`. Then send the files to the user and give a progress report.

## 1. Titles: give 5 options and mark one as recommended
- 60 characters or fewer, front-loaded with curiosity plus a clear subject. The title and thumbnail should **complement each other, not repeat**.
- Patterns that fit the channel:
  - question: "What Did Pyramid Builders Actually Do All Day?"
  - reveal: "A Pyramid Builder's 4,500-Year-Old Diary"
  - myth flip: "The Pyramids Weren't Built By Slaves — Here's the Proof"
- No clickbait the video doesn't pay off within its first minute, and no false claims, since the channel is a myth-buster.

## 2. Thumbnails (the recipe the user approved; code in `houdini/merer/thumbs.js`, rendered with `tools/_thumbs.mjs`)
- **Slogan:** 2–4 words that sum up the whole script's thesis or its most surprising true fact. Not the title.
  - Merer: "THE PYRAMIDS HAD PAPERWORK"
  - Merer: "NOT SLAVES. COWORKERS."
  - Merer: "TEAM NAME: DRUNKARDS"
- **Look:**
  - the episode's own scene, lightly blurred and darkened on the text side
  - a sunburst behind the hero
  - the hero (and one key prop) as a white-outlined sticker with a big readable expression
  - Luckiest Guy text with a gradient fill and a heavy stroke, kept inside the frame margins
  - one small Fredoka pill
- 1280×720 PNG under 2 MB. Make 3 options and let the user pick. The text has to stay readable at 160×90 px, so check a downscaled copy.

## 3. Description (`description.txt`)
```
<2-line hook that restates the question + the evidence>  ← shows above "more"

In 2013, archaeologists found ... (3–4 sentence summary, keywords natural)

CHAPTERS
0:00 Cold open
1:17 A king who needs a mountain
...
SOURCES
- Tallet, P. (2017) Les papyrus de la mer Rouge I ...
- Lehner, M. & Hawass, Z. (2017) Giza and the Pyramids ...
#history #ancientegypt #pyramids
```
- **Chapters** come from the episode's chapter cards plus their anchor times. Read `js/timing.js` and the `EK.chapter(...)` calls in the `ep*.js` files.
  - The first chapter must be `0:00`.
  - There must be at least 3 chapters, each at least 10 s long.
  - Times are in `m:ss`.
- **Sources** come from the `historical-research` fact sheet. Credit the experts by name.

## 4. Tags, pinned comment, end screen
- **Tags:** 10–15, from specific to broad (merer diary, wadi al-jarf papyri, great pyramid workers, khufu, ancient egypt, history documentary).
- **Pinned comment:** one fascinating fact that didn't make the cut, plus a question to the audience, e.g. "What would your crew be called?"
- **End screen (last 20 s):** the next episode plus a subscribe prompt. The final shot must leave room for it, so keep the end-screen area of the last 20 s free of important text.

## 5. Shorts / Reels: 3 cut-downs, 30–55 s each, 1080×1920
- Pick self-contained beats: a twist, a myth bust, or a weird fact (onions, "Drunkards of Menkaure", beer as liquid bread).
- Re-frame by rendering the shots into a 9:16 crop around the subject, or with a blurred backdrop plus the centred 16:9 frame.
- Add big captions, and end with a hook back to the full video.

## 6. Retention review (before publishing)
- Within the first 30 s, the question and the promise should be stated.
- No stretch of more than 40 s without a visual change.
- Each chapter should end on an open loop.
- The thumbnail and title promise should be paid off by about 1:00.
- Report problems as `mm:ss — risk — fix`.

## Thumbnail style B: "Two Sides" reference (user, 2026-10-23); code in `houdini/merer/thumbs2.js`
The user's preferred cartoon thumbnail look, modelled on the @TwoSideHistory channel and made with our own characters and content:
- A **crisp, bright scene** from the episode with no blur, plus a soft-light boost and a dark gradient behind the top text.
- **The slogan sits at the top on one line**: 2–3 words in Luckiest Guy, white with a heavy black outline, and one word in yellow or red. Examples: "THE PYRAMID DIARY", "NOT SLAVES?!", "PAID IN BEER", "TEAM NAME: DRUNKARDS".
- **Two characters waist-up at the bottom corners (scale about 1.3, feet below the frame) with exaggerated, opposite emotions**:
  - one shocked or panicking (eyes wide, mouth shock/o, brows up/worried, sweat), using the palms-up `presentBoth` pose
  - one overjoyed (eyes happy, mouth grin, blush) with `cheer` or `thumbsUp`
  - never `facepalm`: it covers the eye and reads as pain
- **One hero prop in the centre** with a hand-drawn red ring, a red arrow, a small black tag such as "c. 2560 BC", and a red stamp ("MYTH").
- **Surprise/panic variant** (user request, `houdini/merer/thumbs3.js`): both characters react. Each gets a comic shock effect around the head:
  - **Surprised:** `presentBoth` pose, eyes wide, mouth `o`, brows up, a yellow starburst behind the head, and a yellow "!?".
  - **Panicking:** `cheer` pose (it reads as a hand on the head), eyes wide, mouth `shock`, brows worried, sweat, an orange starburst, a red "!!" and flying sweat drops.
  - End slogans with "?!".
- **Keep it clean** (user feedback, `houdini/merer/thumbs4.js`): the FX-heavy v4 was "too many unnecessary details". The approved minimum is:
  - one simple backdrop: sky, one pyramid and sand, or a plain stone wall
  - two characters reacting with their faces only
  - ONE prop, with at most one red ring or X
  - the slogan

  No starbursts, "!?" marks, flying drops, tags, stamps, camps or crowds unless the user asks for them.
