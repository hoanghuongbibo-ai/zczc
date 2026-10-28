# Editing, pacing and writing guide (learned from the user's reference clips)

The rules here apply to every video in this repo. They come from 15 clips the user sent:
- the white-faced cartoon battle and knight explainers (Rome, the samurai, war elephants, the Hundred Years' War);
- the cinematic Opis mutiny documentary;
- the "Historically Facts" China clips.

## 1. Pacing: nothing holds still

- **One framing per narration beat.** The cartoon references cut or re-frame every **1.5–3 s**, and never hold a shot past ~4 s unless something big is happening inside it (a horse charging, a map animating).
  - A 10–15 s shot of characters standing and swaying is a failure.
  - `canada/js/coverage.js` enforces this automatically. It cuts each scene on the narration's pauses into a close-up of the speaker, a reaction shot, an insert on the photo or document, a two-shot or a re-framed wide.
- **Rotate the shot types.** A typical 10 s run:
  1. establishing wide or a top-down map;
  2. a close-up of the main character reacting;
  3. an insert on the object being talked about (a shield, the armour, a document);
  4. a medium action shot;
  5. a punch-line close-up.
- **Every shot has an action, not just a pose.**
  - People *do* things: run, point, cover their head, pull a rope, slip in mud, salute, shove, hand over a paper.
  - Listeners react: a sweat drop, eyes darting, a glance at a neighbour, arms crossed, a jump of surprise.
  - When the narrator names a person, that person *does* the thing said.
- **Visualise the sentence literally**, then add a twist:
  - "the bottom rose up against the top" → a man on a pedestal, ropes, pulled down;
  - "kingdom vs dynasty" → a dictionary page;
  - "the first dynasty" → a star pin dropping on a map, then a label arrow.
- **Maps are alive.**
  - A red pin drops, then the label is written on.
  - The date underlines itself.
  - A dashed route draws, ships move along it, and a counter card pops up ("20 elephants").
  - A coloured region fills or wipes.
  - A small figure stands on the map to give scale.
- **Reveal moves.**
  - A brief hold, then a slam zoom on a rays background with a banner ("ULTIMATE WEAPON").
  - A question card on a signpost ("Were war elephants actually useful?").
  - A deflating comic beat right after (the pig).
- **Recurring on-screen devices:**
  - a myth checklist in the corner that ticks or crosses ("A KING? WHAT NOW?");
  - locked character cards that flip open (1, 2, 3 ???);
  - a "TIME MACHINE" timeline bar with a sliding marker;
  - a "YOU" tag pointing at the viewer's stand-in in a crowd.
- **Transitions are motivated:**
  - wipes by a wave of colour (the Yellow River flood);
  - a dissolve through smoke;
  - a silhouette sequence on a paper screen for violence;
  - a hard cut on the beat of a sound effect.

## 2. Picture detail

- **The world moves in the background:** birds cross the sky, flags flap, rain and arrows fall, smoke rises, a crowd sways, a horse twitches, a lantern flickers.
  - `coverage.js` adds a background-life layer based on each scene's ambience (birds outdoors, dust motes indoors, snow, battle smoke and embers).
- **Depth of field.** Foreground objects (spear tips, shield rims, a blurred soldier) sit in front of the subject; background crowds are soft. Close-ups put the face very large on a blurred battlefield.
- **Story props in the corners:** a dropped shield, a stuck arrow, a puddle, a basket, a campfire pot. Something to read in every corner.
- **Faces carry the joke.** Big eyes for shock, `> <` for strain, a sweat drop, a smug half-lid, a single tear, red-eyed menace on a black silhouette.

## 3. Sound

- **A bed for every place**, never silence: wind, rain, crowd murmur, a camp, the sea. `canada/js/soundmap.js` assigns one per scene.
- **Every on-screen event has its own sound:**
  - text landing gets a pop or tick;
  - a photo pinned gets a paper rustle;
  - a cut gets a short swish;
  - stamps, slams and hits get an impact with a camera shake;
  - big reveals get a riser into a low boom.
  - `tools/autosfx.mjs` scans the film for text, photos, figures and cuts and schedules these automatically.
- **Realistic foley for actions:** footsteps in mud, armour clanking, hooves, arrows whooshing and thunking into shields, the crowd gasping or cheering.
- **The music follows the mood:**
  - tense drums for battles;
  - a single low drone and silence for tragedy;
  - a playful pizzicato for jokes, with a hard stop before the punch line.
- **Ducking.** When an effect plays, the beds dip so the effect reads clean, and the narration always sits on top.
- **Prefer real recordings.** Use Wikimedia Commons, public domain or CC BY only (see PROTOCOL.md §6); the synthesised sounds are the fallback.

## 4. Writing: intro, body, conclusion

### Introduction (first 30–60 s)
- **Cold open** on the most dramatic moment, in medias res ("It's 1921. A Canadian army officer…"; "In 324 BC… they mutinied").
- **Raise one question** the viewer needs answered ("How did a few cold colonies… never get absorbed?").
- **Promise the payoff and the angle** ("The answer isn't a war. It's a pattern.").
- **Title card / series tag** ("This is the ENTIRE history of …").
- Keep sentences short, with concrete nouns and one number.

### Body
- **Chronological chapters**, each a mini-story: setup → complication → turn → consequence. Each chapter ends on a hook into the next ("Hold onto that. It comes back with a price tag.").
- **A recurring device** gives the long video a spine: the deal stamp, an invasion counter, the corner checklist, numbered cards.
- **Alternate weight and relief:** a grim fact, then a light visual joke. Never two tragedies without air, and never a joke on a tragedy.
- **Honesty markers** where the evidence is thin: "according to the ancient historian Arrian…", "historians still argue…".
- **Second person sparingly** for immersion ("you're a knight in the front line", the "YOU" tag).

### Conclusion
- **Return to the opening question** and answer it in one line.
- **Recap the spine** (the deals, the counter) in a quick montage.
- **Widen to meaning:** who was left out, and what is still unfinished.
- **Close the loop with the cold-open image** (Buster's border, now full of trade).
- **Call to action** with a question for the comments, and a next video that fits.

## 5. Typography (learned from the reference clips)
- **Two faces only:**
  - **Luckiest Guy** (chunky display) for titles, headlines, names and dates;
  - **Fredoka 700** (rounded bold) for captions, facts and labels.
  - No typewriter or thin serif fonts for anything the viewer must read.
- **On-picture text:** white (or a strong colour) fill, a thick dark outline (~26% of the size) and a soft drop shadow. It pops in with a small scale overshoot.
- **Labels and tags:** a white rounded pill with a dark edge (or a tinted one for categories). Map names are bold and dark.
- **Dates:** a slanted white plate with a black edge in the corner ("1600 B.C." style).
- **Keep it short:** one line, two at most. Long text shrinks to fit or wraps; it never runs off screen.
- Implemented once in `canada/js/type.js`, so every chapter inherits it.

## 6. Maps as characters (from the Warring States clips)
- **Territories have faces.** Every coloured country or province is a character with a mood that fits the story: smug sunglasses for the big power, angry for the aggressor, shocked for the target, worried sweat drops for the weak one. They blink and breathe. Implemented in `C.map` as `faces: name => mood` (`regionFace`).
- **Maps act out the history:**
  - regions grow muscles or weapons;
  - a giant hand squashes a region;
  - a broom sweeps the losers off;
  - a region swallows its neighbour;
  - arrows fly between rivals;
  - a tiny state hides behind a big one.
- **Running counters on a hanging sign** ("WARRING STATES COUNT: 1"), and a "FREE FOR ALL" era badge in the corner.
- **Zoom from the whole map into the two rivals**, then back out to show the new balance. Every new region pops in with its name written beside it and an arrow.

## 7. Character and story devices (from the Qin / Han clips)
- **Name cards on introduction:**
  - a big outlined name with a handwritten role line and an arrow ("THE FIRST EMPEROR of Qin", "LIU BANG", "HAN XIN");
  - "A VS B" title splits divided by a lightning crack for rivalries.
  - In the Canada film this is `canada/js/overlays.js` (`NAMES`).
- **An era badge in a corner** that flips when the era changes (the Qin icon becomes the Han icon), plus a date plate bottom-right. In the Canada film this is `ERAS`.
- **Letterbox bars and hard dark colour** for the serious beats: the poison, the betrayal, the death. Then a hard cut back to the bright map. In the Canada film this is `BARS`.
- **The counter sign swings in and flips its number** when the state of the world changes. In the Canada film this is `G.dealSign`.
- **Parody frames from pop culture** (a game "evolution" dialog box, a trading-card wall of rulers, a "THIS IS WAR" scroll unrolled from a cracking map). Use them sparingly, at most once a chapter, and always to land a story point.
- **Characters travel across the map** (a general sweeping over territory, flags planted behind him), and armies are shown as a crowd of little figures appearing in a pop of smoke.
- **Event title plates** ("THE HONGMEN FEAST") slide in on a red-trimmed white bar as the scene opens.
- **Letters and documents are written in a personal hand** and read out ("Look, just say I'm technically the boss… — Liu Bang").
- **Silhouettes and shadows on a wall** for violence; ghosts fade out for deaths.
