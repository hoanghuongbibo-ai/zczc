---
name: historical-storytelling
description: Write or rework a narrated script for the user's history / myth-buster channel — immersive second-person cold open, a big question, chaptered clues, myth set-up and bust, human details, modern payoff — in the channel's script format with [SCENE]/[MAP]/[DOCUMENT]/[TITLE CARD]/[DIAGRAM]/[MUSIC] notes. Use when the user asks to write, outline, punch up, shorten/lengthen or restructure an episode script, or turn a fact sheet into a script.
---

# Historical storytelling (episode script)

The reference script is **Merer's Diary** (`houdini/merer/`, 17:03, 13 chapters). It opens with "You wake up on the deck of a boat. It's July…". Before writing anything new, read its transcript in `houdini/merer/transcript.txt`.

## Shape of an episode (about 15–18 minutes, about 2,300–2,700 words at about 150 wpm)
1. **Cold open, about 60 s, second person, present tense.** Drop the viewer into one concrete moment, e.g. "You wake up on the deck…". Use sensory details (heat, river, 40 men sleeping) and show one striking object, such as the diary line "Spends the night at Tura South."
2. **The turn, about 15 s.** "Here's the strange part…". Reveal that the scene is real and say how we know.
3. **The question, said out loud.** "What did the pyramid builders actually do all day? Who fed them? Who patched them up?" Then dismiss the clichés in one breath: "So forget the whips. Forget the aliens."
4. **The promise.** "The answer starts with one man who did something rare: he wrote it down."
5. **Chapters, 10–13 of them, each with a `[TITLE CARD]`.** Alternate between two kinds:
   - **Context chapters**: the king, the myth, the discovery.
   - **Day-in-the-life chapters**: morning, midday, afternoon, evening, night. These follow the viewer's own day in the crew.
6. **The myth bust.** State the myth fairly and say where it came from (e.g. "The story everyone believed"). Then bring the evidence as numbered clues ("Clue #1: a tomb painting"). Then give the nuanced verdict, e.g. "Egypt did have slaves — just not the main workforce on these pyramids."
7. **The twist chapter.** Use the most human surprising fact, e.g. "Your team has a name… Drunkards of Menkaure."
8. **The cost.** Show what the bones remember. Stay honest; it was not a holiday.
9. **Legacy payoff.** Link back to the viewer's life: "You still live in the world they started: timesheets, crew rosters, shipping logs."
10. **The closing image.** Bring back the cold-open motif, e.g. "somebody, somewhere, is still writing down where the team spent the night", and end on a two-to-four-word button: "Write it down."

## Rules
- **One thesis.** Every chapter has to move it forward. If a fact doesn't serve the question, cut it, or move it to a pinned comment.
- **Hook density:**
  - Something changes every 20–40 s: a new place, number, object or question.
  - End every chapter on an open loop, e.g. "But that's not the strangest part of the diary."
- **Human scale over statistics.** "~30 blocks per trip" beats "2.3 million blocks". When you use a big number, give it something to compare against.
- **Mark every hedge** that came from `historical-research`: "an estimate", "probably", "historians still argue". Never turn an estimate into a fact for drama.
- **Names on first mention** need a role and a pronunciation hint in a note, e.g. `[NAME CARD: Pierre Tallet (pee-AIR tah-LAY), led the French-Egyptian team]`.
- **Second person ("you")** belongs in the cold open and the day-in-the-life chapters. Use third person for the evidence and the experts.
- **Humour** is dry and comes out of the facts (team names, onions, "beer = liquid bread"). Never mock the people of the past.
- **Sentences:** keep them short and speakable, ideally under 22 words. Write numbers as they will be spoken (see `documentary-voiceover`).

## Script format (what the user sends and what the engine reads)
```
[MUSIC: ambient Nile, low]
[SCENE: dawn, a cargo boat moored under limestone cliffs; 40 men asleep on deck]
You wake up on the deck of a boat. It's July.
[DOCUMENT: papyrus line in hieratic → "Spends the night at Tura South."]
[TITLE CARD: 1 — A king who needs a mountain]
[MAP: Egypt, the Nile from Aswan to Giza; pin Giza]
[DIAGRAM: dry vs wet sand — pulling force halves]
[MUSIC: out]
```
Every visual note should name a place, time of day and mood, because the storyboard depends on them. If a beat's visual can't be described in one line, split the beat.

## Workflow
1. Start from the `historical-research` fact sheet, or build one first.
2. Write a one-page **beat outline**: chapter, the question it answers, the key evidence, and the closing open loop. Show it to the user if the topic is new.
3. Write the full script in the format above, and give a word count and an estimated runtime.
4. Run a read-aloud pass: no tongue-twisters, every name has a pronunciation, and every estimate is hedged.
5. Hand off to `documentary-voiceover` (VO prep) and `cinematic-storyboard` (shots).
