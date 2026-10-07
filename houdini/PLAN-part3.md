# Part 3 — "The Séance in Atlantic City" + "The Medium Who Nearly Won"

Narration: `assets/audio/narration-part3.mp3` (209.7 s). Word anchors come from `tools/align-part3.py` and are written to `js/timing3.js`.
Shots: `js/show3.js` (chapter 1, s1–s23) and `js/show3b.js` (chapter 2, b0–b19, plus the timeline and sound cues).
The page is `part3.html`; render it with `node tools/export-video.mjs part3.html out/houdini-part3.mp4 30`.

## New cast (`js/cast3.js`, original designs in the house style)
- **Sir Arthur Conan Doyle**: big and ruddy, with slicked brown hair, a walrus moustache and a three-piece tweed suit (`doyle` / `tweed`).
- **Jean, Lady Doyle**: Edwardian updo, pearls and a lavender tea gown. Her trance pose uses closed eyes (`jean` / `teaGown`).
- **Kingsley Doyle**: a WWI officer's portrait (`kingsley` / `uniform`).
- **Mina "Margery" Crandon**: a 1920s finger-waved bob and a teal drop-waist dress (`margery` / `flapper`).
- **Scientific American committee**: a bearded professor and a bespectacled editor, both in grey suits (`professor`, `editor`, `greySuit`).

## Hands (feedback on Part 2)
- Hand pieces are now drawn as one outline (`Chars.union`), so the fingers no longer look like separate sausages.
- The open, fist and point hand shapes are redrawn.
- New `Chars.handshake` draws a proper clasp seen from the side. It's used in Part 3 (Houdini meets Doyle) and replaces the closing handshake in Part 2.

## Shots
| Anchor | Shot |
|---|---|
| "Sir Arthur…" | Chapter strip and Doyle's framed portrait. Label: *creator of SHERLOCK HOLMES*, with a magnifying glass swinging. Then *LEADING SPIRITUALIST* |
| "He was also…" | Doyle at a lectern under a SPIRITUALISM banner; the audience claps |
| "…in 1916" | Newspaper slam: CONAN DOYLE: "I BELIEVE" |
| "…and he believed…" | Doyle, hand on heart, at the mantel with Kingsley's portrait and a black ribbon |
| "Houdini and Doyle met…" | England, 1920: they walk in and shake hands; REAL FRIENDS stamp |
| "They disagreed…" | Tea table with thought bubbles (ghost vs. crossed-out ghost); on "civil" they raise their teacups |
| "Then, in June 1922…" | Ambassador Hotel on the boardwalk; the sign lights up on "Ambassador" |
| "Doyle's wife, Jean…" | Jean's oval portrait, then the AUTOMATIC WRITING card drops |
| "A medium holds a pencil…" | Close-up of a hand writing; a pale spirit hand settles over it on "spirit" |
| "She offered…" | Hotel suite: Jean makes the offer; Houdini thinks of his mother's portrait |
| "Houdini agreed." | A single nod |
| "Lady Doyle entered…" | Trance writing. Pages fly onto a pile and the counter reaches PAGE 15 on "fifteen" |
| "The pages were full…" | Close-up of loving words being written, with hearts |
| "Houdini read them…" | He reads; the page cracks on "didn't hold" |
| "It was written in fluent English…" | First page; cards for FLUENT ENGLISH vs. LITTLE ENGLISH ✗ |
| "…marked with a cross" | Zoom to the cross and circle it; Cecilia's portrait, *devout Jewish woman · a rabbi's wife*; ✗ |
| "…around her birthday" | Calendar for June 1922 with the 17th circled and a cake. A magnifying glass sweeps the page: NOT MENTIONED |
| "…cheating… sincere" | Houdini thinking. CHEATING? ✗, then SINCERE ✓ |
| "That was what troubled him." | Close-up, rain on the glass |
| "If honest, loving people…" | Diagram machine: the Doyles and a heart feed in, GRIEF, and out comes a FALSE message / EVIDENCE? |
| "When his doubts became public…" | Two newspaper slams |
| "The friendship never recovered." | Their photo tears in two |
| "…doubter to… opponent" | Stage sign flips DOUBTER → OPPONENT; Houdini points |
| (pause) | Chapter strip THE MEDIUM WHO NEARLY WON and the $2,500 PRIZE card |
| "Scientific American…" | Magazine cover, then the cheque slides out on "offered" |
| "…convince a committee…" | The committee table; Houdini's nameplate lights up and the camera pushes in on "Houdini sat" |
| "Mina Crandon…" | Oval portrait, then the "MARGERY" clipping, then "wife of a respected surgeon" |
| "In her darkened séances…" | Dark séance; Walter's bubble from nowhere: "…" → GOOD EVENING… → #@$%! → SIT STILL! |
| "Bells rang. Objects moved." | Hand bell swings and rings; the trumpet lifts off the table |
| "In July 1924…" | Map: a train from New York City to Boston with Houdini at the window |
| "One test used a bell box…" | Blueprint cutaway: lid, spring, contacts, battery and bell; it rings on "pressure" |
| "Houdini sat beside Margery…" | Top-view diagram: the hand link and leg against leg, with the bell box between them |
| "He later wrote…" | Under-table diagram: her leg slides to the box, DING on "foot"; inset of Houdini's eyes sliding |
| "Next, Houdini had a cabinet…" | The cabinet: panels slide to her neck and the padlocks snap onto their hasps |
| "At one sitting…" | X-ray: a folding ruler appears inside, then unfolds through the neck hole to press a bell |
| "Margery's supporters said…" | Split screen of accusations, then a NEVER RESOLVED stamp |
| "What was resolved…" | The cheque stamped NOT AWARDED |
| "Houdini published a pamphlet…" | Pamphlet slam |
| "Walter's voice turned on him." | The bubble swings toward Houdini and turns red |
| "According to several accounts…" | Newspaper column; DEAD WITHIN A YEAR highlighted on "dead" |
| "The details change…" | Three tellings, with the DATE / WORDING / WHO rows highlighted on each word |
| "One Houdini historian…" | Marquee HOUDINI — DEAD IN A YEAR?; he hands out papers; EXCELLENT PUBLICITY |
| "Either way…" | Case file with a ticking clock; ON THE RECORD stamp; fade out |

## Notes
- The recorded narration doesn't include the line "By 1924, one candidate looked close to winning". It goes straight from "Houdini sat on that committee" to "Mina Crandon of Boston", so that beat has no shot.
- Chapter titles aren't spoken, so they appear as on-screen strips. The second one sits in the pause after "opponent".
