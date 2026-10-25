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
    // ambience: each scene's bed (js/soundmap.js) runs from its cut to the next cut; equal neighbours merge into one bed
    const marks = []; F.chapters.forEach((ch, ci) => { const map = (G.SOUNDMAP || [])[ci] || {}; for (const c of ch.cut) marks.push([c[0], map[c[1].name] || 'room']); }); marks.sort((a, b) => a[0] - b[0]);
    const amb = []; marks.forEach(([t, type], i) => { const t1 = i + 1 < marks.length ? marks[i + 1][0] : duration; const last = amb[amb.length - 1]; if (last && last.type === type) last.t1 = t1; else amb.push({ t0: t, t1, type }); });
    for (const [ph, from, type, gain = 1, off = 0] of G.SOUNDFX || []) sfx.push({ t: at(ph, from) + off, type, gain });
    return { duration, narration: 'canada/assets/audio/narration-full.mp3', shots: P.cutList(cut, duration), sfx, moods, amb, images: G.CA_IMAGES, fonts: ['400 20px "Special Elite"', '400 20px "Permanent Marker"', '400 20px Anton', '400 20px "Luckiest Guy"'] }; };
  // per-frame bookkeeping for lip-sync: the absolute time, and whether this frame's main character has been claimed yet
  if (G.Toon && !G.Toon.__wrapped) { const rf = G.Toon.renderFrame; G.Toon.renderFrame = (ctx, shots, t) => { G.__frameT = t; G.__spoke = false; return rf(ctx, shots, t); }; G.Toon.__wrapped = true; }
  G.Film = F;
})(window);
