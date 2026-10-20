# The Maya: thumbnail prompts

These prompts work with Midjourney, GPT-image, Imagen, Flux and similar tools. Each one has three parts: a **style block** that is the same every time (so the thumbnails match the videos), a **scene** that changes per concept, and a **negative prompt**.

The prompts keep words out of the image. Most image models misspell lettering, so add the text yourself afterwards (see "Text overlay" below). If your model handles text well, such as GPT-image or Ideogram, you can add `with the bold words "STILL HERE" in…` to the scene.

---

## 1. Style block (paste at the start of every prompt)

```
YouTube thumbnail, 16:9, flat 2D vector cartoon in the style of a modern history explainer channel. Thick dark ink outlines of even weight, simple round-headed characters with dot eyes and small expressive mouths, flat colour fills with one soft shadow tone, no gradients on characters. Bright saturated palette: turquoise sky, jade green, warm sand, gold (#F6C945), tomato red (#C8322A), cream paper (#F1EAD8). One big clear subject filling at least 40% of the frame, simple uncluttered background, strong contrast between subject and background, slight vignette, warm golden-hour light. Leave clean empty space on the left third for a headline.
```

## 2. Negative prompt (or "avoid…" line)

```
photorealistic, 3D render, anime, painterly texture, watercolor, washed-out colors, low contrast, busy background, tiny subject, text, letters, watermark, logo, signature, extra fingers, distorted faces, gore, blood, skulls, Aztec or Inca costume mix-ups, feathered "Indian chief" headdress, Hollywood apocalypse clichés
```

---

## 3. Thumbnail concepts

### A. "STILL HERE" (recommended: it carries the whole video's twist)
```
[STYLE BLOCK] A smiling Yucatec Maya woman in a white huipil with bright embroidered flowers around the square neckline, hair in a bun with a red ribbon, standing proudly beside a folding table with a blue cooler and water bottles, sunrise behind her. Behind her looms the stepped pyramid El Castillo at Chichén Itzá. In the foreground, a crumpled cream newspaper page with a giant red X slashed across it. Hopeful, triumphant mood.
```
**Overlay:** `"EXTINCT?"` in red at top left, `STILL HERE.` in gold on the bottom left. Optional small sticker: `6,000,000 SPEAKERS`.

### B. "NOTHING ENDED" (the 2012 hook)
```
[STYLE BLOCK] Close-up of a car dashboard odometer at dawn, its five cream number wheels reading 13 · 0 · 0 · 0 · 0, the last wheel glowing gold and mid-roll to 1. Through the windshield, a jungle and a Maya pyramid silhouetted against a pink-orange sunrise. A shocked cartoon tourist face peeks in from the right edge, eyes wide. Playful, mind-blown mood.
```
**Overlay:** `2012 WAS A LIE` (red, white outline) or `NOTHING ENDED.`

### C. "THE 5 FAKE ENDINGS" (list/myth-buster angle)
```
[STYLE BLOCK] Five cream newspaper obituary cards fanned across a warm wooden desk, each with a thick black border and a big green rubber stamp slammed on top at an angle. A cheerful Maya woman in a white embroidered huipil leans in from the right, giving a thumbs-up. Crisp top-down lighting, lots of contrast.
```
**Overlay:** `THE MAYA "ENDED" 5 TIMES` with the word `WRONG` matching the green stamps.

### D. "KINGS FELL. THEY DIDN'T." (contrast split)
```
[STYLE BLOCK] Split composition. Left half: a cartoon Maya king in a towering green quetzal-feather headdress and jade collar toppling backwards off a cracked stone stela under a harsh drought sun, dry cracked earth. Right half: a group of smiling Maya farmers and a grandmother in white huipils standing in a lush green cornfield under a soft sunrise. A jagged line divides the two halves. Dramatic but family-friendly.
```
**Overlay:** `KINGS FELL.` over the left half, `THEY DIDN'T.` in gold over the right.

### E. "THE BOOK BURNING" (mystery/dark variant; test against A)
```
[STYLE BLOCK] Night scene with deep purple sky. A huge bonfire in the centre with folded bark-paper Maya books (codices) fluttering into the flames, glowing orange light on the faces of a small row of silhouetted onlookers. On the right, one surviving codex glowing gold, floating safely out of the fire. Suspenseful mood, still bright and readable.
```
**Overlay:** `ONLY 4 SURVIVED`

---

## 4. Text overlay (add in Canva, Photoshop or Figma)

- **Font:** Luckiest Guy (the font used in the videos), or Bangers as a fallback.
- **Colours:** gold `#F6C945` or white text with a thick dark outline (`#1D1A17`, about 10–12 px) and a soft drop shadow. Use red `#C8322A` for the one "shock" word.
- **Size:** keep it to 2–4 words, legible at phone size. Test it at 168×94 px.
- **Placement:** put text in the empty left third. Never put text over a face. Keep the bottom-right corner clear, because the video length badge covers it.
- **Contrast rule** (same as the videos): if the background behind the text is busy or a similar colour, put the text on a paper strip or a dark banner.

## 5. Settings

- **Midjourney:** add `--ar 16:9 --style raw --s 150 --no text, letters, watermark`.
- **GPT-image / DALL·E:** ask for "1792×1024, landscape". Put the negative list in the prompt as "Do not include: …".
- **Export:** 1280×720 JPG under 2 MB.
- **A/B test:** run A against B in YouTube's "Test & compare".
