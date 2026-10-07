# "The Death of Harry Houdini": opening sequence

**Status:** built. Open `index.html` to play it, or watch `out/houdini-opening.mp4` (42 s, 1280×720, 30 fps). `preview.html` is the 12 s preview.

## Style

The style is learned from the user's two reference clips (motion and design techniques only; nothing from them is copied):

- **Sets:** flat colour bands, soft vignettes and a centre glow.
- **Labels:** a paper date tag top-left, plus paper caption strips.
- **Camera:** slow, steady push-ins and hard cuts.
- **Graphic beats:** counters that ease out, stamps that slam with an overshoot, newspapers dropping in, evidence sliding into place.
- **Fonts:** Fredoka and Luckiest Guy (OFL licences in `assets/fonts/`).

## Character rig (`js/rig.js`)

The user's two character images are sliced into cut-out puppets:

- **Parts:** head on a neck pivot, hands on a wrist pivot, and a collar overlay that hides the seam. Hidden fills (neck, vest, shirt front) sit behind every cut.
- **Eyes:** repainted inside exact eye-white masks generated from the art (`assets/img/rig/`), so the outlines and the brows that cut into the eyes are untouched. This drives blinks and eye direction.
- **Extra modes:** straitjacket overlay, ankle irons, silhouette tint (the punch reconstruction) and sepia print (old photographs).

## Motion rules

The physics lives in `js/common.js`: closed-form functions of time, so any frame renders directly.

- **Settle:** overshoot-and-settle for snaps (cuffs springing, padlocks, stamps).
- **Gravity:** the milk-can lid lands exactly on the clang, and the cuffs fall away.
- **Damped pendulums:** the chain swinging free from the remaining cuff, the hanging chains jolted by each release.
- **Critically damped approach:** the coffin lid sliding shut, evidence settling, the grave push stopping.
- **Anticipation:** his wrists brace before each cuff opens, and the stranger's arm pulls back before the punch. The frame freezes at impact on the word "punch".
- **Motivated eyes:** to camera, then to the cuffs; to the window in the hospital; closed and still once he is dead.

## Timeline (cuts on narration word timings)

| Time | Part | Shot |
|---|---|---|
| 0.0 | 01 | Grace Hospital exterior, push to the lit window |
| 3.95 | 01 | The room: bed (breathing, slow blink), doctor and nurse from behind |
| 5.4 | 01 | Glass → pocket watch at 1:26 → handcuffs → the limp hand ("died"); cut to black |
| 7.7 | 02 | On stage, wide: sway, smug tilt, glance at the cuffs |
| 9.6 | 02 | Close-up on the hands: cuffs spring open on "getting out", "things" and "killed" |
| 12.05 | 02 | Suspended straitjacket over the street (1915): the struggle drives the swing, and the camera rolls with him |
| 13.6 | 02 | Milk can (1908): he sinks in, the lid drops, padlocks snap, water leaks |
| 14.75 | 02 | Water torture cell (1912), held: head-down in the tank, bubbles rising |
| 17.15 | 03 | Overhead, Hotel Shelton pool (5 Aug 1926): he lies down in the coffin |
| 19.25 | 03 | Lid slides shut (clang), bolts tighten one by one |
| 20.0 | 03 | Underwater: the coffin sinks with drag and lands with a silt puff |
| 21.15 | 03 | 01 → 91 MIN counter with an hourglass |
| 22.25 | 03 | Lid swings open; he sits up |
| 22.9 | 04–05 | Match cut to the bed: eyes closed, pull back ("dead at fifty-two") |
| 25.2 | 05 | Death record: AGE 52 highlighted, the physician signs |
| 26.25 | 05 | RUPTURED APPENDIX stamped on the cause line |
| 26.9 | 05 | Clinical diagram: the appendix swells and ruptures |
| 27.6 | 06 | Three newspapers slam down (HOUDINI / PUNCH / DEATH) |
| 28.85 | 06 | Presses run and the stack grows |
| 29.4 | 06 | Silhouette reconstruction: wind-up, punch, freeze at impact |
| 30.9 | 07 | Séance table: a hand places the OCT 31 card, the portrait fades, the candle gutters |
| 33.1 | 08 | Evidence slides in around his photo (2007) |
| 34.5 | 08 | Machpelah Cemetery, a cold morning, track in |
| 35.35 | 08 | The HOUDINI grave marker; the camera eases to a stop, then silence |
| 38.2 | — | Title: THE DEATH OF HARRY HOUDINI |

## Rebuild

```
node tools/export-video.mjs index.html out/houdini-opening.mp4 30
```

The exporter needs Chromium launched with file access (it is in the script), so the canvas can read the PNG art from disk.
