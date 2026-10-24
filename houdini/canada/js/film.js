/* Canada — the film timeline. Chapters register shots in absolute narration time; at(phrase, from) finds a phrase's spoken
 * start in the aligned script (js/timing.js). The master page builds one Show for the whole 23-minute film. */
(function (G) {
  'use strict';
  const W = G.WORDS, norm = s => (s.replace(/[—-]/g, ' ').match(/[A-Za-zÀ-ÿ']+|\d[\d,.]*/g) || []).map(w => w.toLowerCase().replace(/[^a-z0-9']/g, '').replace(/'/g, '')).filter(Boolean);
  const W2 = W.map(([w, t]) => [w.replace(/'/g, ''), t]);
  function at(ph, from = 0) { const q = norm(ph); for (let i = 0; i <= W2.length - q.length; i++) { if (W2[i][1] < from) continue; let ok = true; for (let k = 0; k < q.length; k++) if (W2[i + k][0] !== q[k]) { ok = false; break; } if (ok) return W2[i][1]; } console.warn('anchor not found', ph, from); return from; }
  const F = { chapters: [], at };
  F.chapter = (ch) => F.chapters.push(ch);
  F.build = (duration) => { const P = G.Paint, cut = [], sfx = [], moods = []; for (const ch of F.chapters) { cut.push(...ch.cut); sfx.push(...(ch.sfx || [])); moods.push(...(ch.moods || [])); }
    cut.sort((a, b) => a[0] - b[0]); moods.sort((a, b) => a.t - b.t);
    return { duration, narration: 'canada/assets/audio/narration-full.mp3', shots: P.cutList(cut, duration), sfx, moods, images: G.CA_IMAGES, fonts: ['400 20px "Special Elite"', '400 20px "Permanent Marker"', '400 20px Anton', '400 20px "Luckiest Guy"'] }; };
  G.Film = F;
})(window);
