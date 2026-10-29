# The American Revolution — plan

Voice: `assets/revolution/voice-full.mp3` (18:45, one file). Times below are word times from the pocketsphinx
transcript (`houdini/tools/asr.py`).

## Defaults (the user can override them)

- **Tone:** the script is "immersive mode, no skits". It keeps the reference style's look, HUD and parchment maps.
  Light gags only on harmless beats: taxes, the "British are coming" myth, Steuben swearing through his aide, the
  "one-third" myth, "a navy outside, just not his". Played straight (muted grade, no faces on map blobs, slow camera):
  deaths, prison ships, slavery, Native nations, the Mount Vernon ledger.
- **No on-screen host.** The recurring lead is **YOU**, a 16-year-old private: battered tricorne, blanket, ragged
  brown coat, rag-wrapped feet. White round head like every extra (`G.Cast`, costume `you`).
- **HUD:**
  - Top-left badge: where we are, a mini map and the month/year.
  - Bottom-right date tag on every date.
  - Question card "HOW DOES A LOSING ARMY WIN?" opens at 0:49.9 and stays on screen. Its ✗ turns to ✓ at 17:38.6
    ("It didn't win by winning").
  - Hanging sign "ENLISTMENTS END IN: 6 DAYS" in the cold open. It returns as "THE ARMY IS STILL HERE ✓" at 5:44.4,
    6:56.6, 8:56.5 and 15:20 (the four times the line is said).
  - MYTH stamps for "The British are coming!" (2:29) and "1/3 – 1/3 – 1/3" (12:20).
- **Delivery:** 4 parts, cut at beat boundaries:
  1. 0:00–4:23.6 — cold open, the world before, the spark, the army.
  2. 4:23.6–8:59.4 — New York, Trenton, Saratoga, Valley Forge.
  3. 8:59.4–13:34.5 — Steuben, the twist, the South.
  4. 13:34.5–18:44.6 — the fleet, Yorktown, aftermath, close.
- **Music:**
  - cold (wind + drone) for the cold open, Valley Forge and the Delaware callbacks;
  - warm for the world before;
  - tense for the spark and the trap at Brooklyn;
  - strings only for the twist and the aftermath;
  - drum for Yorktown;
  - warm again for the close.

## Recording vs script

- The sponsor block and the "Now where were we? Right." line are not recorded: Steuben's swearing (9:29) runs straight
  into "The army survived New York…".
- The outro says "subscribe for more stories like this" and has no related-video line.
- Everything else matches the script.

## Data notes (on-screen text only; the narration is fixed)

- Valley Forge huts: the narration says "about 1,300". Park sources range from 900 to 2,000, and NPS most often says
  1,500+. No hut number goes on screen.
- Yorktown forces: the narration says 5,700 / 3,100 / 7,000 French vs 7,500 British. NPS's Yorktown handbook says
  7,600 French, and British estimates run 7,000–9,000. On screen: "≈16,000 allies vs ≈8,000 British".
- All other [VERIFY] items are confirmed: Saratoga 17 Oct 1777; alliance 6 Feb 1778; Charleston 12 May 1780; the
  14 Oct redoubt assault, with Hamilton leading the American column; Clinton's fleet 24 Oct; Commons votes 27 Feb and
  4 Mar 1782; Book of Negroes ~3,000; Oneida and Tuscarora with the Americans; Sullivan campaign ~40 towns;
  1st Rhode Island; ~1 in 5 enslaved; >3 million equivalent; the teeth ledger of 8 May 1784.
- Teeth ledger: Mount Vernon says it is unknown whether the teeth went into Washington's own dentures, so no visual
  implies that.
- 1776 losses on the "1776 RECORD" board: Long Island 27 Aug, White Plains 28 Oct, Fort Washington 16 Nov.
- British flag on every map and ship: the 1707–1801 Union Flag (St George + St Andrew, no St Patrick saltire).

## Assets (user's zip → `assets/revolution/img/`)

Used:
- **Paintings and engravings:**
  - `leutze-crossing` (4c callback);
  - `doolittle-lexington` and `concord-bridge` (Beat 3);
  - `old-north-engraving` and `old-north-steeple` (the lanterns);
  - `trumbull-declaration` (July 1776);
  - `long-island-chappel`, `long-island-retreat`, `long-island-dandrea` (4b);
  - `trumbull-trenton` (4c);
  - `trumbull-burgoyne` (Saratoga; only 250 px wide, so small card only);
  - `trego-valley-forge` (4e);
  - `jersey-interior` and `jersey-exterior` (Beat 6);
  - `redoubt-10` and `trumbull-yorktown` (7c);
  - `west-treaty-paris` (Beat 8).
- **Portraits:** `revere-copley`, `washington-stuart`, `steuben-peale`, `cornwallis-gainsborough`.
- **Documents:** `dunmore-proclamation`, `declaration-parchment`.
- **Photos:** `valley-forge-hut`, `mount-vernon`, `independence-hall-engraving`.

Not used (flagged to the user):
- "Cornwallis portrait (Gainsborough) 2" shows a naval officer in a blue coat, not Cornwallis.
- "Battle of Long Island 5" is a modern illustrated map with text errors; it looks AI-made.
- "Declaration parchment 2" is the Currier & Ives *Declaration Committee* print.
- "Trumbull, Declaration 2" is the key diagram, not the painting.
- "Valley Forge huts" (first file) has a Shutterstock watermark.
- The Brown Bess photo looks like a later gun.
- The Delaware photos show the upper Delaware gorge, not Washington Crossing.
- Fireworks and modern photos have unknown licences.

Missing → drawn defaults: de Grasse, Rochambeau, Dawes, Tallmadge, Dunmore, Clinton, Hamilton, Adams (name cards);
the ledger page, Book of Negroes, coin, stamp (drawn documents with source tags).

## Cold open (built: `rev-open.html`, preview 0:00–1:01.4)

| t | words | shot |
|---|---|---|
| 0.00 | It's Christmas night, 1776 | Tilt down from a sleet sky to the iced Delaware and boats; date tag DEC 25, 1776 |
| 2.91 | and you're sixteen | Meet YOU (close), label "YOU / AGE 16" |
| 4.93 | Pennsylvania bank of the Delaware | Wide bank, lantern, labels PENNSYLVANIA / DELAWARE RIVER / NEW JERSEY; badge in |
| 8.04 | moving ice. Big slabs | Water close; a huge slab slides in on "slabs" |
| 12.02 | grinding … dragging furniture | Slab grinds along a Durham boat hull; inset: armchair dragged, "SCRRRAPE" |
| 16.87 | It's sleeting | YOU hunches, squint, chattering, heavy sleet |
| 18.14 | shoes gave out … rags | Feet close; old shoe's sole peels; "WEEKS AGO", "RAGS" |
| 21.81 | shift your weight … cold | Weight shift, frost creeps up the legs, "COLD" |
| 26.30 | running for four months | Parchment map: retreat route Brooklyn (Aug) → PA (Dec), "4 MONTHS" |
| 30.08 | lost New York / New Jersey | NYC area turns red + LOST, NJ floods red + LOST, Union flags on the garrisons |
| 32.91 | captured, killed, gone home | Road line-up: two roped off, two fade, two walk home; YOU alone |
| 38.06 | enlistment … six days | Night camp, "ENLISTED UNTIL DEC 31, 1776" papers, hanging sign drops: 6 DAYS |
| 45.16 | New Year's Day … stops existing | Calendar flips to JAN 1 1777, sign counts to 0, camp empties |
| 49.75 | loses, and loses, and loses | "1776 RECORD" board, three LOSS stamps; YOU peeks; question card opens |
| 55.16 | most powerful empire on Earth | Pull back from tiny YOU to a wall of grenadiers and a fleet |
| 58.47 | Over the next twenty minutes | Title: THE AMERICAN REVOLUTION, 1775–1783 |

Next: 61.4–79.3 teaser (fog escape, winter of 2,000 dead, Prussian drillmaster, French admiral, "get in the boat"),
then Part 1 continues with Beat 2.
