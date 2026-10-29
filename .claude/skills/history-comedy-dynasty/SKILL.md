---
name: history-comedy-dynasty
description: Make a video in the "comedy history / ENTIRE history of a country" cartoon style the user studied (15 reference clips of a China-history video, dynasty/references/) — painted cartoon sets, white round-head characters, a narrator host who changes outfits per set, parchment maps where states are coloured blobs with faces, HUD badges (current dynasty, date tag, question tracker), anachronism gags. Use when the user sends a script / voice-over for this style, asks what assets it needs, or asks to change/improve it. Work lives in dynasty/.
---

# Comedy history ("ENTIRE history of …") cartoon video

References: `dynasty/references/ref01–15.mp4` (960p copies of the user's clips, in order; one continuous video from
"China" intro through Xia, Shang, Zhou, Spring & Autumn, Warring States to Qin's unification) and `sheet01–15.webp`
(1 frame/s contact sheets). Look at the sheets before every new video. The narration in the clips could not be
transcribed (no Whisper model reachable here; pocketsphinx fails under the music), so the words come from the user's
script.

**Originality:** this is a *style* to match, not a show to copy. Never reuse the reference channel's host design,
title card ("HISTORICALLY FACTS"), patron list, or its exact jokes. Build our own host and gags in the same spirit.
Pop-culture parodies in the reference (Among Us, Pikmin) → use our own generic stand-ins, no trademarked characters.

## 1. The look

- **Art:** clean cel-shaded cartoon, thick dark-brown/black outlines (~6–8 px at 1080p, thinner on small props),
  one or two flat shadow tones per colour plus a soft gradient light, rich saturated palette. Backgrounds are detailed
  painted sets (grassland + mountains + cloudy sky, palace interior with lattice windows and red pillars, bamboo grove,
  wooden study with a scroll easel, night mountain road with a big moon, market stall with oranges) — busier and more
  painterly than the characters, slightly desaturated so characters pop.
- **Characters (extras):** big perfectly round white head, thick outline, a grey shading crescent on one side, tiny
  features: dot or line eyes, short angled brows, small mouth; ancient men get a long black moustache + chin beard
  drawn as strokes. Small robe body (hanfu with crossed collar, sash, wide sleeves), white mitten hands with 3–4 fingers,
  stubby legs. Status by hat: emperor's mian crown (flat board with bead strings), scholar cap, conical straw hat for
  peasants/assassins, helmets for soldiers, hair buns for women. Some named rulers get skin tone or a gimmick tag
  (e.g. a "THE VERY BEST" name sticker).
- **Expressions are the comedy:** `>_<` squint-yell, `^_^` smug, wide `O_O` shock with sweat drops, `-_-` deadpan,
  angry slanted brows with cross veins, crying streams, sparkly eyes. Effects: sweat drops flying, "!!" / "?" marks,
  zig-zag shock lines, impact starbursts, motion streaks, a smoke cloud "POOF!" for transformations.
- **The host / narrator** (ours to design — the reference uses a brown-haired bun + round glasses + curly moustache
  guy): appears in many sets in **different outfits per set** — a traditional jacket at a study with a map easel, a
  pinstripe suit at a game-show set with a big screen, a suit + sunglasses + microphone as a fight announcer, a
  costume inside the story (at a party, peeking through a door). He points at things, yells, reacts, eats food,
  breaks the fourth wall. Get the user's approval on our host sheet before the first video.
- **Typography:** chunky rounded display caps, white fill, thick black stroke, slight tilt (e.g. "CHINA",
  "YU THE GREAT", "XIA KINGDOM?") — use Luckiest Guy / Fredoka (OFL, already in `houdini/assets/fonts/`). Hand-lettered
  marker caps for map labels, signs and props ("JIN", "PROPERTY DEED", "INSTRUCTION", "MEGA PARTY").

## 2. The HUD (always on screen, it's the show's skeleton)

- **Top-left "CURRENT DYNASTY" badge:** semi-transparent grey square, tiny label "CURRENT DYNASTY", the dynasty's
  map silhouette in its colour with its name, the start year under it ("XIA / 2070 B.C."). When the dynasty changes the
  new badge slides in from the right and pushes the old one out. In chaotic eras it becomes an icon badge (crossed
  swords + red "FREE FOR ALL").
- **Bottom-right date tag:** slanted parallelogram, white/pale-yellow fill, thick black outline, bold "1600 B.C."; slides
  in when the narration jumps in time, stays a few seconds. Variant: dark tag "XIA DYNASTY / 2070 B.C." as a lower third
  when a new era is introduced.
- **Top-right question tracker:** when the narration raises a question ("A king? What now?", "Why not kingdom?") a card
  pops in: red ✗ in a white square + orange-to-red gradient bar with white bold text, the key word in red. It stays on
  screen (stacking left to right / top to bottom) through every following shot until the answer, then the ✗ flips to a
  green ✓ with a small pop, holds, and the card slides out. This is the retention hook — use it for every open question.
- **Counters:** a wooden sign hanging on two ropes ("WARRING STATES COUNT: 7") whose number card flips down as states
  fall; it swings in like a pendulum.

## 3. Maps (the core explainer device)

- **Base:** aged parchment (tan with mottled texture), sea in pale cream-grey, coastline with a darker brown edge and
  a soft offset shadow; neighbouring lands faint. Province / statelet borders as thin brown lines when the map is
  fragmented.
- **States are characters:** each territory is a flat colour blob with a thin darker border and a kawaii face (closed
  `^ ^` eyes, little mouths) plus a personality prop — rich state with sunglasses and a wad of cash, strong state with
  flexing arms, angry state with sharp brows, builder state with a yellow hard hat, nerdy state with glasses. Faces
  react (sad when shrinking, smug when growing). Arms pop out holding swords / crossbows / halberds when they fight.
- **Map actions:** territory grows by flooding neighbours (colour wipe), a giant cartoon fist punches a state (impact
  burst) and it caves in, a brush sweeps a state off, one blob "eats" another, a swarm of flies covers a dying state,
  a star drops onto the capital and a curved hand-drawn arrow + label points at it, houses ("TUDOR", "BOURBON") sit on
  countries tied with ribbons to show "dynasty = family that owns the country".
- **Camera:** slow push-ins and pans across the map, zoom into a region for detail, zoom out to show the whole board.
  Labels in marker caps with curved arrows.
- **Map variants:** a tearing paper map on an easel (sheet rips off to reveal the next era's map, each with a yellow
  year tag), a hand in a uniform sleeve planting a flag pin on a big painted map, a "TIME MACHINE" timeline bar (B.C. ↔
  A.D. ruler with a red 0, triangle cursor sliding to the year while the background crossfades between eras).
- **Map data:** real borders must be historically right for the year shown — build each era's polygons from the
  user's reference maps or an atlas they supply; never guess borders. Simplify outlines, keep coastlines recognisable.

## 4. Storytelling and gags

- **One visual per line, ~1.5–3 s each.** Every sentence gets its own staged gag or map move; the host shows up
  every few lines to react.
- **Anachronism metaphors explain the concept:** the Mandate of Heaven = "HEAVEN DMV" (cloud clerk issues a "KING
  LICENSE"; when the king misbehaves the licence gets cut with scissors), "dynasty vs kingdom" = a dictionary page with
  a K entry (king + queen in crowns) that "POOF"s into a D entry (two emperors), a property deed held by a ruler, a
  game-show screen ("XIA DYNASTY?" → "XIA KINGDOM?"), a fight-night "Who Wins??" board with the contenders, the ding
  cauldrons as "NOT MY I'M-IN-CHARGE BUCKETS!!!". Decadence = a "MEGA PARTY" with a DJ booth, wine lake and meat
  trees. Divine reveal of a weapon = cosmic blue/purple swirl with light rays.
- **Real artefacts and art as cut-outs:** a real portrait/painting or museum photo shown as a paper card with a soft
  edge, often grabbed, stretched or held by cartoon hands, next to its cartoon version (e.g. bronze masks).
- **Dark beats without gore:** red-tinted frame with big blood-red text ("CHILDREN"), a black silhouette with a huge
  white grin and glowing red eyes, a demon-horned villain sinking into a green glowing vat, an arrow flying past.
  Violence is implied (a slash of red lines, a stab off-frame, a cut away); never graphic.
- **Big reveals:** radial sunburst (orange/yellow) background with the dynasty's blob spinning in, name slammed across it.

## 5. Motion

- Limited animation with strong poses: 2–4 key poses per shot swapped on the words, each with squash/overshoot, a
  small hold, and secondary motion (hat beads swing, sleeves settle, sweat drops fly). Talking characters = mouth swaps +
  head bob.
- Camera always drifting slowly (push-in or pan) on held drawings; parallax between foreground characters and the
  painted set; occasional focus pull (foreground host blurs, the background gag becomes sharp).
- Transitions: hard cuts on beats, short crossfades between related shots, slide-ins for HUD cards, whip/flash for
  energy. Sound effects on every pop (pop, whoosh, punch, boing, ding, record scratch) under the narration.

## 6. How to build it here

- Engine: the existing canvas pipeline (`houdini/js/toon.js`, `player.js`, `tools/export-video.mjs`, `_stills.mjs`,
  `_at.mjs`) — deterministic `renderAt(t)`, Playwright + ffmpeg. Pages go in `dynasty/` (`dynasty/<slug>-N.html`,
  `dynasty/js/…`, `dynasty/out/`), loading shared libs by relative path like `biz/` does.
- To write before the first video (reusable): `dynasty/js/hud.js` (dynasty badge, date tag, lower third, question
  tracker with ✗→✓, hanging counter sign, time-machine bar), `dynasty/js/map.js` (parchment base, polygon states with
  faces/props/arms, colour-wipe conquest, fist/brush/eat actions, labels with curved arrows, camera), `dynasty/js/cast.js`
  (round-head robe characters with hats, beards and the expression set), `dynasty/js/host.js` (our host + outfits),
  `dynasty/js/gags.js` (sunburst, cosmic swirl, POOF cloud, red-tint dread frame, paper cut-out card, sign boards).
  Reuse the IK rig ideas from `houdini/js/chars.js` and the lip-sync envelope from `biz/tools/envelope.py`.
- Painted backgrounds are the hardest part to match procedurally. Draw layered sets (sky gradient + clouds,
  mountain silhouettes with shading, textured grass, interiors with lattice + pillars) with grain texture; if the
  user can supply background paintings, use them as images and animate on top.
- Workflow = the channel protocol used for `history-myth-buster`: read the whole script → asset order (portraits /
  paintings / artefact photos / historical maps the user can supply, each marked needed / nice to have with a default)
  → align voice to words (`houdini/tools/asr.py` + an aligner) → `dynasty/PLAN-<slug>.md` shot table keyed to anchor
  words, listing every question-tracker card and its answer point and every HUD date change → ~10 s preview + host
  sheet, wait for "run" → build → contact-sheet review (overlaps, HUD covering faces, wrong borders) → render → audio
  check (~−1.5 dB peaks) → commit + push → send parts (one mp4 per voice file).
- History accuracy: dates on HUD tags, borders and names must match the script and mainstream scholarship; when the
  script says "legend says" (e.g. Xia, Yu the Great) keep that framing on screen too.

## Lessons (keep adding)

- Study session (15 clips, China: Xia → Qin): frames read at 1 fps; clips are screen recordings (first clip shows the
  YouTube player UI) with quiet audio (~−46 dB mean), so judge sound design from the user's notes, not the clips.
