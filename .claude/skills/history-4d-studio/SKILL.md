---
name: history-4d-studio
description: "HISTORY 4D VIDEO STUDIO" — the user's standing brief for a cinematic 3D/4D-style historical documentary made with AI image/video generators: act as director, researcher, screenwriter, cinematographer and AI production supervisor, and deliver research → timeline → script → continuity guide → per-scene prompts (image, video, camera/parallax, light, sound, transition, negatives) → accuracy review → edit + YouTube package. Use when the user supplies historical content for a "4D", cinematic or AI-video documentary, or mentions the 4D studio.
---

# HISTORY 4D VIDEO STUDIO (user brief, 2026-10-21)

## Wait first
- Do not invent a topic, and do not write the final script, until the user supplies the content.
- When the content arrives, also confirm:
  - **the video-generation tool**, so prompts can be adapted to it
  - **target length**
  - **aspect ratio**
  - **language of narration and subtitles**

  If any of these are missing, ask once. Otherwise state the defaults you'll use: tool-agnostic prompts, 16:9, English, about 10–15 minutes.

## Visual style
Make it cinematic and photoreal-leaning 3D/4D, with:
- detailed period environments and believable characters
- strong foreground, midground and background depth
- dolly, tracking, pan and orbit moves
- atmosphere where it fits: fog, dust, smoke, rain, firelight and environmental motion
- strict consistency of characters, costume, architecture, props and lighting
- designed SFX, music cues, narration and subtitles
- smooth transitions and a coherent visual story

## Pipeline: deliver in this order, with clear headings and copy-ready prompts
1. **Content analysis**: what the supplied material says, its thesis, and any gaps.
2. **Verification list and timeline**: tag each claim as FACT, DISPUTED, RECONSTRUCTION (artistic) or MISSING EVIDENCE, and give a dated timeline. Use `historical-research` for the method.
3. **Script**: a strong hook in the first 15 s. Use `historical-storytelling` for the structure.
4. **Continuity guide**: a fixed "character card" for each character (age, build, face, hair, period-accurate costume with colours and materials, props, a reference prompt line). Do the same for each environment (architecture, materials, time of day, palette) and set global light and colour rules. Every scene prompt must reuse these exact descriptor strings.
5. **Scene list**: scene IDs with timecode and duration.
6. **Each scene must include all of these:**
   - timecode and duration
   - narration and subtitle lines (subtitles at 42 characters per line or fewer, at most 2 lines)
   - a detailed visual description
   - an **image prompt**
   - a **video prompt**, adapted to the chosen tool's syntax and clip length (e.g. 5–10 s clips)
   - camera move, with depth and parallax layers (FG/MG/BG) and lens/speed
   - lighting, atmosphere and colour
   - SFX and music cue
   - transition to the next scene
   - a **negative prompt** (anachronisms, modern objects, extra limbs, text artifacts, costume drift)
   - **continuity warnings**
7. **Accuracy and consistency review**: a table of claim, status and how it's handled on screen, plus a visual consistency checklist.
8. **Editing instructions**: assembly order, pacing, the audio mix (VO at about −16 LUFS, music ducked), subtitles and colour grade. Then the **YouTube package**: use `youtube-optimization` for titles, thumbnail concepts, description, chapters, sources and tags.

## Accuracy rules (hard)
- Never fabricate sources, quotations or events.
- Keep established facts, disputed interpretations and artistic reconstruction clearly separate, both in the script and as on-screen labels where it matters.
- Flag missing evidence. Don't paper over it.
- Never claim a finished video exists unless a video tool actually produced it. Prompts and plans are not footage.
- If the user later wants it built with the in-house canvas engine instead, hand off to `history-myth-buster` and `cinematic-storyboard`.

## Output hygiene
- Long deliverables go in `history4d/<slug>/`, one markdown file per pipeline step (`01-analysis.md` … `08-edit-and-youtube.md`) plus `prompts.csv` with one row per scene for bulk pasting.
- Commit and push them, then send the files and give a progress report.
