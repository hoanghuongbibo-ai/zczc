/* The full film in the sketch style — the timeline. Chapters register shots anchored to spoken phrases (at() finds a phrase's start in
 * the aligned narration, usa/js/timing.js). Each shot is built by F2.shot(spec): a camera that always moves (keys over the shot's own
 * length, plus drift and impact shakes), a world drawn in camera space, then screen-space type on top. Overlays run on every frame:
 * the location badge (top left), the question tracker, the army meter (top right) and the chapter ribbons. */
(function (G) {
  'use strict';
  const U = G.SUI, ease = U.ease, k01 = U.k01, { clamp, lerp } = G.Rig;
  const norm = s => (s.replace(/[—-]/g, ' ').match(/[A-Za-zÀ-ÿ']+|\d[\d,.]*/g) || []).map(w => w.toLowerCase().replace(/[^a-z0-9']/g, '').replace(/'/g, '')).filter(Boolean);
  const WD = (G.WORDS || []).map(([w, t]) => [w.replace(/'/g, ''), t]);
  const at = (ph, from = 0) => { const q = norm(ph); for (let i = 0; i <= WD.length - q.length; i++) { if (WD[i][1] < from) continue; let ok = true; for (let k = 0; k < q.length; k++) if (WD[i + k][0] !== q[k]) { ok = false; break; } if (ok) return WD[i][1]; } console.warn('anchor not found: ' + ph + ' @' + from); return from; };
  // end of a phrase: start of its last word + that word's length estimate
  const after = (ph, from = 0) => { const q = norm(ph), t0 = at(ph, from); let i = WD.findIndex(w => w[1] >= t0 - .001); return i >= 0 && WD[i + q.length] ? WD[i + q.length][1] : t0 + q.length * .3; };
  const F2 = { chapters: [], at, after, badges: [], ribbons: [], meter: [], trackers: [], images: {} };
  F2.chapter = (ch) => { F2.chapters.push(ch); for (const b of ch.badges || []) F2.badges.push(b); for (const r of ch.ribbons || []) F2.ribbons.push(r); for (const m of ch.meter || []) F2.meter.push(m); for (const tr of ch.trackers || []) F2.trackers.push(tr); Object.assign(F2.images, ch.images || {}); };
  // a shot: spec = { cam: [[z, x, y], …] or [[u, z, x, y], …], world(ctx, t, lt, d), ui(ctx, t, lt, d), shake: [t…], vig, sky }
  F2.shot = (spec) => function (ctx, lt, dur, t) { ctx.save(); const ks = spec.cam || [[1, 640, 360], [1.05, 640, 360]]; const keys = ks.map((k, i) => k.length === 4 ? [t - lt + k[0] * dur, k[1], k[2], k[3]] : [t - lt + (ks.length > 1 ? i / (ks.length - 1) : 0) * dur, k[0], k[1], k[2]]);
    if (spec.bg) { ctx.save(); ctx.fillStyle = spec.bg; ctx.fillRect(0, 0, 1280, 720); ctx.restore(); }
    const cv = spec.noCov ? null : G.__cov; if (cv) { ctx.translate(cv.cx, cv.cy); ctx.scale(cv.z, cv.z); ctx.translate(-cv.cx, -cv.cy); }
    U.cam(ctx, t, keys, { shake: (spec.shake || []).map(s => Array.isArray(s) ? s : [s, 6]), drift: spec.drift ?? 1, ease: spec.ease }); spec.world(ctx, t, lt, dur); ctx.restore();
    if (spec.ui) { ctx.save(); spec.ui(ctx, t, lt, dur); ctx.restore(); } U.finish(ctx, t, spec.vig ?? .4); };
  // ---------- overlays ----------
  const inRange = (list, t) => { let cur = null; for (const b of list) if (t >= b[0] && t < b[1]) cur = b; return cur; };
  F2.overlays = (ctx, t) => { if (t < 61.4) { if (G.drawSketchOverlays) G.drawSketchOverlays(ctx, t); return; }
    const b = inRange(F2.badges, t); if (b) U.badge(ctx, t, Math.min(k01(t, b[0], .5), 1 - k01(t, b[1] - .4, .4)), b[2], b[3]);
    const tr = inRange(F2.trackers, t); if (tr) U.tracker(ctx, Math.min(k01(t, tr[0], .5), 1 - k01(t, tr[1] - .4, .4)));
    // the meter: shows ~5 s around each change (value eases from the previous one)
    for (let i = 0; i < F2.meter.length; i++) { const [mt, lv, tag, hold = 5] = F2.meter[i]; if (t >= mt - .3 && t < mt + hold) { const prev = i ? F2.meter[i - 1][1] : 1, v = lerp(prev, lv, ease.inOut(k01(t, mt + .4, 1.2))); if (!(tr && t > tr[0])) U.meter(ctx, v, Math.min(k01(t, mt - .3, .4), 1 - k01(t, mt + hold - .4, .4)), t, { tag }); } }
    for (const [rt, num, title] of F2.ribbons) U.ribbon(ctx, num, title, t - rt); };
  F2.build = (duration) => { const open = G.SketchOpen, cut = [...open.cut], sfx = [...open.sfx], moods = [...open.moods], amb = [...open.amb];
    for (const ch of F2.chapters) { cut.push(...ch.cut); sfx.push(...(ch.sfx || [])); moods.push(...(ch.moods || [])); amb.push(...(ch.amb || [])); }
    cut.sort((a, b) => a[0] - b[0]);
    // coverage: a shot longer than ~6 s is cut into 4–5 s pieces that alternate framings (wide / push-in left / push-in right), like cutting
    // between camera angles; the shot's own animation and its screen-space type continue untouched across the cuts
    const VAR = [null, { z: 1.2, cx: 560, cy: 400 }, { z: 1.14, cx: 760, cy: 380 }, { z: 1.24, cx: 640, cy: 440 }];
    for (let i = cut.length - 1; i >= 0; i--) { const [t0, fn, tr] = cut[i], t1 = i + 1 < cut.length ? cut[i + 1][0] : duration, D = t1 - t0; if (t0 < 61.4 || D <= 6.2) continue; const n = Math.ceil(D / 4.6), seg = D / n, extra = [];
      for (let k = 1; k < n; k++) { const v = VAR[(k + i) % VAR.length]; extra.push([t0 + k * seg, (ctx, lt, d, t) => { G.__cov = v; fn(ctx, t - t0, D, t); G.__cov = null; }, 0]); } cut.splice(i + 1, 0, ...extra); cut[i] = [t0, (ctx, lt, d, t) => { G.__cov = null; fn(ctx, t - t0, D, t); }, tr]; }
    moods.sort((a, b) => a.t - b.t); amb.sort((a, b) => a.t0 - b.t0);
    // a soft swish on every cut past the cold open that has no sound of its own nearby
    for (const c of cut) if (c[0] > 61 && !sfx.some(s => Math.abs(s.t - c[0]) < .35)) sfx.push({ t: c[0], type: 'swish', gain: .14 });
    // the ribbons get a riser + hit
    for (const [rt] of F2.ribbons) sfx.push({ t: rt, type: 'impact', gain: .35 }, { t: rt + .05, type: 'swish', gain: .3 });
    // ambience: close the gaps (each bed runs to the next one)
    for (let i = 0; i < amb.length; i++) amb[i].t1 = Math.min(amb[i].t1 ?? duration, i + 1 < amb.length ? amb[i + 1].t0 : duration);
    const images = Object.assign({}, open.IM, F2.images);
    return { duration, narration: 'usa/assets/audio/narration-full.mp3', shots: G.Paint.cutList(cut, duration), sfx, moods, amb, images, fonts: ['400 20px "Permanent Marker"', '400 20px "Luckiest Guy"', '700 20px Fredoka'] }; };
  if (G.Toon && !G.Toon.__f2) { const rf = G.Toon.renderFrame; G.Toon.renderFrame = (ctx, shots, t) => { G.__frameT = t; G.__spoke = false; const r = rf(ctx, shots, t); F2.overlays(ctx, t); return r; }; G.Toon.__f2 = true; }
  G.F2 = F2;
})(window);
