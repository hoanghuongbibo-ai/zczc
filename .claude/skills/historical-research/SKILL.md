---
name: historical-research
description: Research and fact-check a history topic for the user's history / myth-buster channel before or while a script is written — find the evidence, separate fact from estimate from myth, name the sources and experts, add pronunciations. Use when the user gives a topic or a draft script and asks to research it, check facts, find sources, "is this true?", or prepare a fact sheet for a new episode (e.g. Merer's Diary, Vindolanda, Houdini).
---

# Historical research (fact sheet for an episode)

The channel's promise is "what really happened, and how we know". Every claim on screen has to survive a
comment from an archaeologist. This skill produces the **fact sheet** that `historical-storytelling` turns
into a script and `cinematic-storyboard` turns into on-screen labels.

## Output: `houdini/<episode>/research.md`
1. **One-line thesis**: the surprising truth the episode proves. Merer example: *"The pyramids were built by organised, fed, named crews, and we know because one of their inspectors kept a logbook."*
2. **The myth(s)** being busted, and where each one comes from. For example, Herodotus' 100,000 men came about 2,000 years after the build, and slaves with whips are a Hollywood image.
3. **Claim table**, one row per fact that will be said or shown:

   | # | claim (as it will be said) | status | source | caveat / how to say it |
   |---|---|---|---|---|
   | 1 | Papyrus Jarf A is the oldest inscribed papyrus ever found | FACT | Tallet 2017 *Les papyrus de la mer Rouge I*; Egyptian Museum Cairo | "oldest inscribed papyri found so far" |
   | 2 | ~10,000–25,000 workers | ESTIMATE | Lehner & Hawass, *Giza and the Pyramids* (2017) | always say "estimate" or "about" |
   | 3 | The team was called "Friends of Khufu" | FACT | Lehner, gang marks in relieving chambers | name the source on screen |

   Statuses:
   - **FACT**: direct evidence.
   - **ESTIMATE**: a scholarly calculation.
   - **DEBATED**: experts disagree, so show both sides.
   - **MYTH**: false, so say where it comes from.
   - **UNKNOWN**: say "we don't know".
4. **People to name on screen**: name, role, institution, year, plus a pronunciation. For example: *Pierre Tallet (pee-AIR tah-LAY), led the French-Egyptian team, 2013.*
5. **Dates and numbers**: use one convention throughout ("c. 2560 BC", "about 4,500 years ago"). Give ranges where scholars disagree, e.g. "Khufu's reign: one estimate 2589–2566 BC; exact dates unknown".
6. **Visual evidence list**: the real objects, places and documents to depict, such as papyri, ostraca, graffiti, maps, bones and tools. This feeds the `[DOCUMENT]` and `[MAP]` notes.
7. **Hedging vocabulary** to use: "probably", "the team estimates", "historians still argue", "one common estimate". Write down every place the script must hedge.

## Method
- **Source ladder.** Use the highest rung available:
  1. excavation reports, peer-reviewed papers, and museum catalogues
  2. books by the excavators
  3. university or museum outreach
  4. quality press (Smithsonian, BBC, Nature news)
  5. general web

  Never rely only on rung 5 for a number.
- If a WebSearch tool is available, search in standard mode. Use extended mode only for niche details, e.g. "Wadi al-Jarf harbour 2013 Tallet". Fetch the primary page whenever you can, and record the URL plus the date you accessed it.
- For every number, write down who calculated it and how. Bone counts lead to meat per day; block counts lead to workforce size.
- **Red flags:**
  - ancient historians writing centuries later (Herodotus, Pliny)
  - round numbers with no method
  - "scientists say" with no name
  - claims that only appear in listicles
  - modern political spin
- Anachronism check: titles, money, weekdays and units have to fit the period. The Egyptian work "week" was 10 days. Workers were paid in bread and beer, not coins.
- If the user's script states something wrong, don't rewrite it silently. List it as **"needs fix"**, give a suggested wording, and ask the user before changing their narration.

## Hand-off
- `historical-storytelling` uses the thesis, myths, clues and human-scale details.
- `cinematic-storyboard` uses the visual evidence list, name cards and on-screen labels, keeping every hedge word.
- `youtube-optimization` uses the source list for the description.
