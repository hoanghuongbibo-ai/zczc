---
name: documentary-voiceover
description: Prepare and integrate the narration for the user's history channel — make a script speakable (numbers, names, pauses, pronunciation), give recording/TTS specs, and align a delivered mp3 to the animation (ASR → anchors.txt → js/timing.js) so shots cut on the words. Use when the user asks for a VO/TTS-ready script, pronunciation guide, pacing/timing check, or sends a narration mp3 to be synced to an episode.
---

# Documentary voice-over

## 1. A speakable script (before recording)
- **Pace:** 140–155 words per minute. Runtime is roughly words ÷ 150. Merer has about 2,550 words and runs 17:03, which includes music beats.
- **Numbers** are written the way they're said: "twenty-five hundred BC", "about four thousand pounds", "two to three metric tons". Avoid "~", "–", "%" and "c." in VO lines; those symbols belong to on-screen text.
- **Names** get a pronunciation on first use, in a note the voice actor or TTS can follow:
  - Merer (MEH-rer)
  - Khufu (KOO-foo)
  - Ankhhaf (ANKH-hahf)
  - Tallet (tah-LAY)
  - Heit el-Ghurab (HAIT el-ghoo-RAHB)
  - phyle (FILE)
  - Hatnub (HAT-noob)

  Use the same spelling for on-screen name cards.
- **Pauses:** use "…" for a beat of about 0.6 s and a new paragraph for about 1.2 s. Put a pause before every reveal: "His name is Merer. … He's your boss."
- **Emphasis:** use at most one stressed word per sentence, in *italics* in the prep copy.
- **Repetition of the key phrase** is on purpose. "Write it down" appears in the promise and again at the end. Don't remove it when tightening.
- **Tone:** a warm, curious friend telling you a secret, not a lecturer. Lift on questions and drop on verdicts.

## 2. Recording / TTS spec to give the user
- **Format:** mono WAV or high-bitrate MP3, 44.1 or 48 kHz, voice only. Music and SFX are added by `js/score2.js`.
- **Level:** about −16 LUFS integrated, peaks at or below −1.5 dB, with room tone trimmed and no noise gate chatter.
- **Takes:** one file for the whole episode is preferred. If there are several, name them `01.mp3, 02.mp3…` in script order.
- **Script changes:** if the delivered audio differs from the script (ad-libs, cuts), the audio wins. Align to what was actually said.

## 3. Syncing a delivered mp3 to the animation (the house pipeline)
Full details are in `history-myth-buster` → "Voice alignment". In short:
1. Put the narration at `houdini/<ep>/assets/audio/narration.mp3`.
2. Run ASR to get word timings in `asr.json`. Keep `transcript.txt` beside it.
3. Write `anchors.txt` with one line per cue word, `key|approx seconds|recognised words`, e.g. `whips|59.03|so forget the whips`. Rules:
   - **Keys must be unique.** A duplicate silently breaks timing; Merer's "away" had to become "awayfrom".
   - Anchor the word where the picture should change, not the start of the sentence.
   - ASR mishears names ("manner" for Merer, "cool for" for Khufu). Match the misheard words; don't fix them in `anchors.txt`.
4. Run `python3 tools_anchor.py asr.json anchors.txt js/timing.js` to regenerate the timings. Shots use `R('key')` for cues relative to the shot.
5. Check the alignment:
   - `node tools/_scan.mjs <ep>/episode.html 0.5` should report no errors.
   - Spot-render stills at a few anchors (`tools/_at.mjs`) and confirm the visual matches the line.
6. **Mix:** narration and music are summed with a limiter at 0.84 in `tools/export-par.mjs`. The final audio peak should be about −1.4 dB. If the music masks the voice, lower that mood's level in `score2.js`, not the voice.

## 4. Pacing review (after the first render)
- Look for any stretch over 40 s with no visual change, a cue that lands more than 0.3 s before its word, or a joke with no pause after it.
- Report problems as `mm:ss — line — problem — fix`, and fix them in `anchors.txt` or in the shot code, never by editing the audio without asking.
