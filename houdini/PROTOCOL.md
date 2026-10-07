# Working protocol for each new part of the Houdini script

These are the steps agreed with the user while building the opening sequence.

## 1. Intake
- Read the script part, the storyboard notes and any reference media.
- Align the narration to the word. I use a pocketsphinx transcript plus silence detection, so cuts, sound effects and acting beats land on words.

## 2. Plan first, no building
- Write a short plan: a shot list with times and anchor words, the cast needed, outfits and poses, props, and sound and music mood.
- List any open questions with sensible defaults.
- Make a short preview (~10 s) and render a character sheet for any new cast, outfit or pose.
- **Wait for the user to say "run" before the full build.**

## 3. Style rules (locked)
- The explainer look of the two reference clips: flat sets, soft vignettes and a centre glow, a paper date tag top-left, paper caption strips, slow push-ins, hard cuts, counters, stamps and slams.
- Use the user's character art where it fits exactly: the hospital bed, and the suit pose with steepled hands. Use the posable Houdini (`js/chars.js`) for every other outfit, pose and expression. He must stay recognisably the same person.
- Supporting characters are original designs in the same style (`js/chars.js` cast), with faces or faceless as fits the shot.
- No copying of reference footage, characters or logos. Use made-up names for newspapers and similar.

## 4. Motion rules (locked)
- Every move has a motivation in the story and believable physics. Use the closed-form helpers in `js/common.js`: settle/overshoot, gravity drop with bounce, damped pendulum, critically damped approach.
- Anticipation before actions, follow-through after them, and no random jitter.
- Eyes are motivated: characters look at what matters in the shot.
- Props work like the real objects (locks on hasps, hinges on the right edge, ropes where something would float, and so on).

## 5. Build and verify
- Review a contact sheet of every shot and fix anything unreasonable before rendering.
- Render to MP4. Measure audio levels (peaks around −1.5 dB). Audio can't be listened to here, so ask the user to check timing by ear.

## 6. Deliver
- Commit and push to `claude/tencent-story-animation-hiuikf`, and send the MP4. If the upload is too large, send a compressed copy.
- Summarise what changed, the defaults chosen, and anything that still needs the user's eye.
