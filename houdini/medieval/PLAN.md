# "Did medieval peasants work less than you?" — Hugh Miller of Alwalton, 1279

This is a new series in the house style, the same flat explainer-cartoon look as the Houdini parts. The folder is `houdini/medieval/`. The cast lives in `js/cast-med.js`, and the draft character sheet is `out/character-sheet.png`.
The script runs about 3,950 words (about 24 min). It will be built in **4 parts** of about 6 min each. That way you can review each part, and the renders stay manageable:

| Part | Beats | Est. length |
|---|---|---|
| 1 | Cold open, Beat 2 (the world before), Beat 3 (the deal) | ~6 min |
| 2 | Beat 4: morning + midday (up to the sponsor) | ~5.5 min |
| 3 | Sponsor break, Beat 4 afternoon/night, Beat 5 (150 days) | ~6 min |
| 4 | Beat 6 (famine + plague), Beat 7 (aftermath), Beat 8 (close) | ~6.5 min |

## Visual language for this episode

- **Palette.** Period dyes only: russet wool, woad blue, madder red, undyed linen, monastic black, weld yellow, and parchment for every document. Modern-world shots (alarm, PTO, meme) are cool blue-grey with phone light, so the two worlds can be told apart at a glance.
- **Two worlds.** Present-day shots are flat, clean and blue. 1279 is warm parchment with a soft grain. Every cut back to the present (cold open, Beat 5 meme, close) is a hard colour switch.
- **Recurring motifs (pay-offs are built in):**
  1. **The egg counter.** A small paper tag in the corner reads 🥚 5. It appears when the eggs are first named, comes back at "literal eggs", and burns in 1381 ("egg counter: 5 → burning").
  2. **The Wheel of the Year.** Hugh's year is drawn as a ring of 52 weeks × 7 days. On "three days a week" the abbot's days fill in black, one week at a time, spinning around the year. The three holiday weeks (Christmas, Easter, Whitsun) stay gold. The wheel returns in Beat 5: the cow icon still sits on the gold days.
  3. **The abbot's hand.** A big black-sleeved hand with a ring reaches in from frame-right whenever a fee is named (merchet, heriot, tallage). On "at the will of the said abbot" it hovers, then pulls a random amount from Hugh's purse.
  4. **The ledger.** Every fact the abbot owns is written in brown ink on one long parchment roll. In 1381 that roll is what burns.
- **Documents.** The Hundred Rolls, the court rolls and the Statute are shown as stylised parchment (`paperDoc`) with a **modern-English translation** typed over them. Each is labelled "after the Hundred Rolls, 1279", and so on, so no one mistakes it for a facsimile. If you send a real scan, I'll use it with a slow push-in and highlight boxes.
- **Skits** are played as small stage plays: a paper proscenium with a curtain, and a jaunty pipe sting in and out. Each one ends with the locked caption ("Skit dialogue invented. The offense is real…").
- **Tonal shift.** Beat 6 drops the grain to cold grey and removes all jokes. Shots are slow, with no slams. Figures there become silhouettes or faceless.

## Shot table

The anchors are the first words of each shot. Times will be locked to your narration once I have the MP3.

### Part 1

| Anchor | Shot | Motion beat |
|---|---|---|
| [SFX alarm] | Dark modern bedroom, blue phone glow on the nightstand | The phone buzzes and walks across the wood (`FX.ring`). A hand slaps snooze on the slap SFX |
| "Then you checked … PTO" | Phone screen close-up: PTO BALANCE **2.5 days** | The number ticks down 3 → 2.5 and the battery icon flickers. Stamp **NOT ENOUGH** on "wasn't enough" |
| "the internet told you" | Fake social feed (made-up app). The meme scrolls up: a peasant-painting pastiche with the caption "Medieval peasants worked 150 days a year." | Inertial scroll that stops on the meme with `settle`. Like-counter climbs |
| "Fewer work days … naps" | Three meme cards slide in: 📅 holidays / 😴 afternoon nap / 💼 "benefits package" | A cartoon serf in sunglasses lounges on a haystack |
| "So let's check. Meet Hugh." | The colour switch: blue wipes to parchment, and the pipe tune starts | Hugh walks in from frame-left, stops, and turns to camera with a wave |
| "Hugh Miller was a real man" | **[ARTIFACT]** A parchment roll unrolls; the Alwalton entry lights up. ON-SCREEN: "Hugh Miller — Alwalton, England, 1279. A real person." | A magnifying glass settles on the line with his name |
| "employment contract" | The parchment flips and gains a modern header, EMPLOYMENT AGREEMENT, with signature lines | Pen scribble |
| [SKIT] | Paper proscenium. Abbot at a desk with the ledger; Hugh with his cap in hand | "one week at Christmas…": three gold week-blocks pop up. "Three days a week": the Wheel of the Year spins in, black filling. "two guys every day at harvest": two little workers march in. "three hens": hens drop and bounce (`dropBounce`). "And a rooster": the rooster lands last; Hugh's deadpan "…A rooster." The rooster crows. "five eggs at Easter": the egg counter first appears, 🥚 5. "It's literally in writing": the abbot taps the parchment and Hugh's own face is printed on it |
| "yes, no, and it depends" | Three cards: YES ✓ / NO ✗ / IT DEPENDS (a spinning year dial 1279 → 1350) | |
| "a rent paid in eggs, a court…" | **[VISUAL]** Four-panel teaser montage, one panel per item: eggs handed to the reeve / a court where an hourglass runs out and a fine is stamped / three rain-ruined harvest sheaves / a coin purse that bursts open ("strangest pay raise") | Each panel slams in on its phrase |
| [SUBSCRIBE] | A wax seal stamps a parchment SUBSCRIBE button. Caption: "No eggs required", and the egg counter shows 0 for one beat | The seal presses with a squash and stretch |
| "Okay. Back to 1279." | Year counter flips 2026 → 1279 | Hard cut |
| *(chapter strip)* | **THE WORLD BEFORE** | |
| "who owned it" | **[MAP]** England c. 1300, in a parchment map style. Pin on Alwalton, near Peterborough, labelled "now Cambridgeshire" | The pin drops onto land just west of Peterborough |
| "Historians honestly don't agree" | Population bar that wobbles between 4.5 M and 7 M, with a "debated" tag. ON-SCREEN TEXT | The bar slides back and forth like an argument |
| "fewer people than … Chicago" | Two side-by-side silhouettes: Chicago metro (~9.5 M) vs. England 1300. Then England's outline laid over Alabama's at the same scale | The outlines morph and match in size |
| "Farming … no factory" | Vignettes appear and get a ✗: a factory and an office. Then a field and a ✓ | |
| "whoever owns the land owns the job" | **[VISUAL]** A lord on a hill above a patchwork of fields. ON-SCREEN: **"No land. No job."** | Push in from the fields to the manor house |
| "That person is the lord" | Three portrait cards: knight, baron, monastery. The monastery card wins: **Peterborough Abbey** | The abbey's bell tower rings once |
| "The lord runs a manor" | Aerial manor plan: demesne (labelled "de-MAIN", the company farm) in gold, with peasant strips around it | Strips fill in family by family |
| "an org chart" | **[VISUAL]** Org chart: Lord → Steward → Reeve → rows of tiny houses | Boxes drop in on a chain, top-down |
| "Some peasants are free" | Two doors: FREE (money rent, open door) vs. VILLEIN, "VIL-ins" (locked door with a manor seal) | The villein door's padlock snaps shut onto its hasp |
| "Your landlord is also your employer…" | The abbot gains four hats one by one: LANDLORD / EMPLOYER / JUDGE (gavel) / HOA (clipboard). Last: "and you can't move out", as Hugh tries to leave with a bundle and a manor boundary stone blocks the road | |
| "That's Hugh." | Hugh shrugs, tired | |
| *(chapter strip)* | **THE DEAL** | |
| "King Edward I sent officials" | Edward I as a silhouette (mentioned only). Riders with satchels fan out across the map | |
| "the Hundred Rolls" | **[ARTIFACT]** Roll unrolls. Highlight boxes: "Hugo Molendinarius…" (stylised) and "…seventeen other villeins owe exactly the same" | 17 tiny Hugh-silhouettes pop up behind him, each identical |
| "three days a week, all year" | The Wheel of the Year again, and this time it fills completely. Christmas, Easter and Whitsun stay gold. "Whitsun" tag: "= Pentecost, 7 weeks after Easter" | |
| "two men every day" | Harvest panel: Hugh sends two men out the gate every sunrise. A day counter ticks | |
| "the rent in stuff" | Receipt-style list typed onto parchment: bushel of wheat, 18 sheaves of oats, 3 hens, 1 rooster | Each item lands on its word. The sheaves count up 1→18 |
| "And five eggs at Easter" | Egg counter returns: 🥚 5 | Eggs roll in one by one, the last one wobbling (`pendulum`) |
| "merchet" / "heriot" / "tallage" | The abbot's hand reaches in each time: merchet takes a coin at a wedding; heriot leads away the family's best cow (a black ribbon on the door); tallage reaches into the purse | Pronunciation captions |
| "at the will of the said abbot" | Translation quote card | The hand hovers, then takes a random scoop |
| "That's not a tax rate. That's a vibe." | Tax table with a column "RATE" whose value is a wavy line ~ | |
| "Junichi Kanzaka" | Bar chart: villein rent vs. free tenant market rent; the villein bar is lower. Caption: "Kanzaka, Hundred Rolls study" | |
| "Custom was a cage, but also a shield" | The same iron bars rotate 90° and become a shield in front of Hugh. The abbot's "×2 RENT" arrow bounces off it | Great physical metaphor; `settle` on the bounce |
| "written down by and for…" | The parchment shows Hugh's dues in full detail. A thought bubble over Hugh is empty with a "?" — "What Hugh thought: not recorded" | |
| "where the day really starts" | Fade to a pre-dawn Alwalton exterior | |

### Part 2

| Anchor | Shot |
|---|---|
| *(strip)* **ONE DAY ON THE MANOR — Morning** | A sundial icon shifts from shadow to dawn |
| "no alarm … no clock" | Inside the dark one-room house; the fire is banked low. Callback to the modern phone, which is crossed out |
| "the rooster … church bell" | The rooster crows (owed to the abbot: a tiny "owed" tag on its leg). Far-off church bell, with the hour ring of the bell icon |
| "one main room … animals" | A cross-section cutaway of the longhouse: the family at one end, the cow at the other, smoke curling in the roof. The "smells like exactly what you think" gag is a single wavy green fume line and Hugh's nose twitching |
| [SFX oxen] "ploughing season" | Hugh with an ox team on the demesne. Heavy wooden plough with a coulter. Slow, plodding walk cycle; furrow drawn behind |
| **[ARTIFACT] Luttrell Psalter** | Best: a real public-domain scan (British Library Add MS 42130). Otherwise a stylised illuminated-manuscript page with a gold border. Caption "Luttrell Psalter, c. 1320–40". On "It's also not a photograph" a brochure frame snaps around it: **SIR GEOFFREY'S FARM — A LOVELY PLACE TO WORK** |
| "The court rolls" | Manor court in the hall: the steward at a table, villeins on benches, a big hourglass |
| "skipping … stopping work after lunch … fewer animals" | Three court cards slam in. On "fewer animals", a split screen: abbot's field 2 oxen vs. own field 8 |
| [SKIT] Steward / Walter | Paper stage. "Emotional support oxen": eight oxen peek in from frame-right, one at a time, with hearts. Locked caption: "Skit dialogue invented. The offense is real: Elsworth court rolls." |
| "1316 and again in 1322 … about 35 tenants" | 35 tenant icons in a grid; a majority turns red with LATE/ABSENT stamps |
| "Quiet quitting" | A modern office worker (blue palette) and Walter side by side, same slouch |
| "15 and 30 … living somewhere else" | Map: footprints walk out of Elsworth to neighbouring villages; counter 15–30 |
| *(strip)* **Midday** | |
| "Christopher Dyer" | A harvest-meal plate as a pie chart: bread (barley/rye) dominant, a slice of cheese, slivers of ale, fish and meat |
| "these were the well-fed workers" | The plate shrinks into a home bowl of pottage. **[VISUAL]** The family eats from a shared pot |
| "Medieval people drank beer…" | A MYTH stamp slams onto a beer mug (script note) |
| "People drank water" | Village plan with well, spring and stream icons; the cottages cluster around them |
| "calories in a cup" | The mug becomes a nutrition label: "Ale — made from grain — CALORIES" |
| "Mostly women, at home" | **[VISUAL]** Inside the cottage: Hugh's wife brewing, baking, grinding with a hand-quern, spinning. Five hands, five tasks, each motion on its word. Archaeologists' trowel: a quern fragment comes up out of the soil |
| "Cows need milking on Christmas" | The Wheel of the Year again: a cow icon walks across the gold holiday weeks |
| [SPONSOR] | Paper chapter break with a "paid sponsor" disclosure strip. Option A placement (your read) |

### Part 3

| Anchor | Shot |
|---|---|
| "Now where were we?" | Quick recap montage: Wheel → egg counter → family farm |
| *(strip)* **Afternoon** | |
| "long, thin strips" | Aerial open field: Hugh's strips highlighted gold, scattered among others. The village meeting decides: plough / plant / graze icons |
| "everyone in the family works" | The son scares birds with a clapper (crows lift off on the clap). The daughter works beside her mother |
| [MUSIC drops] "Barbara Hanawalt … three thousand" | A coroner's roll; counter 0 → 3,000+. Muted palette |
| "families who searched, who grieved" | **[VISUAL]** Handled gently: a mother at a doorway, the family gathered, faces turned away. No body shown; a small empty shoe by the threshold carries it. On "doesn't survive contact with the evidence", the parchment line "searched for him…" is highlighted |
| *(strip)* **Night** | |
| "Candles cost money" | A candle with a price tag; it's blown out. Straw mattresses by the hearth |
| "you sleep twice" | Moon arc: SLEEP 1 → awake (Hugh by the fire) → SLEEP 2 |
| "Roger Ekirch" | Stacks of diaries 1500s–1800s on a timeline. Hugh's year, 1300, sits before the stack with a "?" |
| "goodnight, Hugh" | The fire goes out; the Wheel of the Year clicks to the next black day |
| *(strip)* **SO WHERE DOES "150 DAYS" COME FROM?** | |
| "Okay. Here's the part…" | Meme returns (blue palette); zoom on "150 days" |
| "Juliet Schor … 1991" | Book-cover silhouette (a made-up cover, title text only) |
| "Nora Kenyon" | ON-SCREEN text card. Two calendars: 120 days filled vs. 308 days filled |
| "Counting days of paid work…" | **[VISUAL]** The ledger counts Hugh's 3 abbot-days. Everything else (own strips, brewing, herding, milking) happens off the ledger in ghosted colour |
| "Humphries and Weisdorf" | Line chart of days of wage work needed: high before 1350, dropping after. A 150-day band glows after 1350 |
| "work suddenly paid so well" | A coin stack on the scale outweighs the day blocks |
| "the summer of 1315" | Sky darkens; first raindrop |

### Part 4

| Anchor | Shot |
|---|---|
| "five million, maybe more" | Population figures pack the map edge to edge; "no margin" gauge at red |
| "eating your seed grain" | A seed sack gets spooned into a pot |
| "it started to rain" | **[VISUAL]** Fields under water, sheaves rotting. Rain, built with streaks that follow gravity |
| "40 percent … 60 percent … still short in 1317" | Three harvest barns as bars, −40% / −60% / short. Caption: Slavin |
| "couldn't buy bread" | Edward II silhouette at an empty bread table, August 1315 |
| "Families sold animals…" | **[VISUAL]** Market: the ox walks away on a rope. Then the bleak scene, livestock losses shown as icons crossing out (no gore) |
| "10 to 15 percent … at least one in ten" | A row of 10 figures; one fades out |
| "In 1348, the Black Death" | Map: a dark tide spreading from the south coast (Dorset, June 1348) inland |
| "a third and a half" | 6 figures: 2 fade, then a dotted outline on a 3rd ("maybe one in two") |
| "Whole villages emptied" | **[VISUAL]** Empty village street, doors open, silence. Wind SFX only |
| "We don't know what happened to Hugh" | The Hundred Rolls parchment, with Hugh's line fading to the background |
| *(strip)* **THE STRANGEST PAY RAISE** | |
| "fewer hands" | The same fields, now with 1 worker where there were 3 |
| "Workers demanded higher wages" | **[VISUAL]** Two lords bid at a field gate; a wage card flips upward |
| **[ARTIFACT] Ordinance / Statute** | Parchment statute: "18 June 1349 — wages as in 1346", "under sixty", then "1351: Statute of Labourers". A wage-cap line is drawn across the chart |
| [SKIT] King / Advisor | Paper stage with throne. On "illegal for wages to go up", a big rubber stamp **ILLEGAL**. Locked caption: "Invented dialogue. The law was real…" |
| "mostly, a failure" | The wage line pushes up through the cap; the cap cracks |
| "Dyer's harvest meals … two hundred years" | The plate morphs: barley/rye bread → wheat bread, bacon → beef, more ale (split screen, script note) |
| "Not a generous Church" | The Church's holiday calendar crossed out; the coin icon wins |
| "In 1381 … Peasants' Revolt" | Crowd silhouettes with torches; poll-tax tally-sticks snap |
| "They burned manor records" | **[VISUAL]** The ledger roll catches fire. Egg counter 🥚 5 curls and burns |
| "Crowland Abbey" | Crowland's tally of customary harvest days: two are struck out |
| "serfdom … slowly died out" | The Wheel of the Year: black days fade to white over a century-long sweep |
| *(strip)* **LEGACY** | |
| "Hugh, in 1279? Probably not." | The Wheel with the cow on the holidays; a court hourglass |
| "his great-grandchildren" | Same-face descendant (Hugh's design, younger) holding a coin and a contract he chose |
| "who owned your time" | **[VISUAL]** Ledger montage: Hugh's labour days, eggs → famine → plague → revolt → a modern time card |
| "That had to be won." | A hand stamps **YOURS** on a time card |
| [SFX alarm] | Same modern bedroom; the snooze slap again |
| "nobody is asking for your five eggs" | Egg counter one last time; the abbot's hand reaches in, pauses, and withdraws |
| [SUBSCRIBE] / comments | The three fees as vote buttons: DEATH TAX / MARRIAGE FEE / RENT IN POULTRY. End screen with a [RELATED VIDEO] slot |

## Fact checks before narration (logic first)

1. **Crowland Abbey "near Cambridge"**: Crowland itself is in Lincolnshire, near Peterborough. Its manors near Cambridge (Oakington, Cottenham, Dry Drayton) are where the 1381 concession happened. Suggest: *"…Crowland Abbey, on one of its manors near Cambridge, gave up…"*
2. **Nora Kenyon's study**: commonly cited as *Economic History Review* 1934 ("Labour conditions in Essex in the reign of Richard II"). Please confirm 1934 vs. 1935 in your source; the on-screen text will use whichever you confirm.
3. **"Hugh Miller"**: the roll is in Latin, so a surname may be a translation of an occupational name (e.g. *Hugo Molendinarius*). If you have the exact Latin form, I'll put it on the artifact. Otherwise I'll keep the parchment text in English translation only.
4. Everything else checks out at the level shown on screen: Ordinance 18 June 1349, under-60s, 1346 wages, Statute 1351, Luttrell Psalter c. 1320–40 (Add MS 42130), Edward II and the bread in Aug 1315, Black Death 1348, rebels burning manor records in 1381.

## Materials I need from you

**Required**
1. **Narration MP3** (one file or one per part). Every cut, stamp and SFX is timed to the spoken word, so nothing can be built before this.
2. **Character approval.** Comment on `out/character-sheet.png` (Hugh, abbot, steward, Walter, wife, children, Edward III, advisor), or send your own character art for Hugh and I'll rebuild him from it, as was done for Houdini.

**Helpful (otherwise I'll use the defaults shown)**

3. **Sponsor** read text, logo or brand colour. Default: a neutral "PAID SPONSOR" paper card.
4. **Channel tagline** and the **[RELATED VIDEO]** title/thumbnail for the end screen. Default: placeholders.
5. **Artifact scans** you've cleared for use: the Hundred Rolls Alwalton entry (Record Commission edition, *Rotuli Hundredorum*), Luttrell Psalter ploughing folio, Elsworth court roll, Statute of Labourers. Default: stylised parchment with modern translation.
6. **The meme**: if you want the real meme image, send it with rights cleared. Default: an original pastiche painting.
7. **Music**: a licensed medieval pipe track if you have one. Default: a synthesised recorder-and-drone score (bright pipe in Beats 1–5, low strings in Beat 6, warm reflective in Beat 8).
