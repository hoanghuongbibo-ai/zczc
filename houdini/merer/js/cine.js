/* Merer's Diary — CINEMATIC 2.5D cut of the cold open + chapter 1 (0:00 → "…one Greek tourist", 2:18).
 * Replaces show.js for cine.html. Reuses the voice-anchored shots of ep0/ep1 and adds the "4D" treatment from
 * history4d/merer-cold-open: dolly camera with parallax, blurred foreground depth layer (reeds / palms), drifting
 * mist, god-rays and floating bokeh dust, dissolves between shots, teal-orange grade, letterbox + subtitles. */
(function (G) {
  'use strict';
  G.Guide.straight = true;
  const T = G.Toon, EP = G.EP, EF = G.EF, TV = G.TV, { W, H, clamp, lerp, ease, rng } = T, TAU = Math.PI * 2;
  const END = TV.hero, XF = .6;   // full frame: no letterbox bars, no burned-in subtitles (subtitles are exported as .srt)   // film ends where chapter 2 names Herodotus
  const keyOf = t => Object.keys(TV).reduce((b, k) => Math.abs(TV[k] - t) < Math.abs((TV[b] ?? 1e9) - t) ? k : b, 'wake');
  const list = EP.shots.filter(s => s.t < END - .5).sort((a, b) => a.t - b.t).map(s => Object.assign({ key: keyOf(s.t) }, s));
  // depth treatment per shot: fg = foreground silhouette layer, mist = dawn mist bands, rays = god-rays
  const LOOK = { wake: { fg: 'reeds', mist: 1, rays: 1 }, forty: { fg: 'reeds', mist: .8 }, cliff: { fg: 'palm', mist: .6, rays: 1 }, awake: { fg: 'reeds', mist: .5 },
    writes: { fg: 'none', dust: 1 }, away: { fg: 'reeds', mist: .4 }, today: { fg: 'reeds', mist: .3, rays: 1 }, across: { fg: 'reeds', rays: 1 },
    strange: { fg: 'none', dust: 1 }, fourthou: { fg: 'palm', dust: 1 }, oldest: { fg: 'none', dust: 1 }, written: { fg: 'palm', rays: 1 }, whips: { fg: 'none' },
    answer: { fg: 'reeds', mist: .4, rays: 1 }, king: { fg: 'none', mist: .25 }, khufu: { fg: 'reeds', rays: 1 }, people: { fg: 'reeds' }, dies: { fg: 'none', dust: 1 },
    orders: { fg: 'palm', rays: 1 }, time: { fg: 'none' }, thinking: { fg: 'palm' }, greek: { fg: 'palm', rays: 1 } };
  const buf = document.createElement('canvas'); buf.width = W; buf.height = H; const bctx = buf.getContext('2d');
  const fgc = document.createElement('canvas'); fgc.width = W; fgc.height = H; const fctx = fgc.getContext('2d');
  function cam(i, lt, dur, t) {   // a slow dolly: push-in along a per-shot drift direction + a hint of handheld float
    const e = ease.inOut(clamp(lt / Math.max(dur, 1))), z = lerp(1.025, 1.1, e), dirs = [[1, .2], [-1, .1], [.3, -.6], [-1, -.3], [1, .5]], [dx, dy] = dirs[i % dirs.length];
    const span = (z - 1) * 600; return { z, x: lerp(-dx, dx, e) * span * .45 + Math.sin(t * .6) * 2.5, y: lerp(-dy, dy, e) * span * .25 + Math.sin(t * .43 + 1) * 1.8 }; }
  function foreground(ctx, type, c, t, seed) {   // near layer: dark silhouettes, defocused, moving ~2x faster than the scene
    if (type === 'none') return; fctx.setTransform(1, 0, 0, 1, 0, 0); fctx.clearRect(0, 0, W, H); fctx.translate(-c.x * 1.9, -c.y * 1.6);
    if (type === 'reeds') { EF.papyrus(fctx, -90, H + 40, 13, 470, seed, t, .26); EF.papyrus(fctx, W - 220, H + 50, 10, 400, seed + 3, t, .24); }
    else { fctx.save(); fctx.translate(W + 40, -40); fctx.rotate(2.5); EF.palm(fctx, 0, 0, 2.1, seed, { dark: .24, dates: false, fronds: 8 }); fctx.restore(); EF.bushMass(fctx, -100, H + 30, 420, 170, seed + 1, .28); }
    ctx.save(); ctx.filter = 'blur(7px)'; ctx.drawImage(fgc, 0, 0); ctx.restore(); }
  function mist(ctx, a, t, c) { if (!a) return; ctx.save(); for (let i = 0; i < 5; i++) { const sp = 8 + i * 5, x = ((t * sp + i * 420) % 2000) - 400 - c.x * (.6 + i * .3), y = 250 + i * 85 - c.y * .5;
      const g = ctx.createRadialGradient(x, y, 10, x, y, 520); g.addColorStop(0, `rgba(255,248,240,${.22 * a})`); g.addColorStop(1, 'rgba(255,248,240,0)'); ctx.fillStyle = g; ctx.save(); ctx.translate(x, y); ctx.scale(1, .16); ctx.translate(-x, -y); ctx.beginPath(); ctx.arc(x, y, 520, 0, TAU); ctx.fill(); ctx.restore(); } ctx.restore(); }
  function dust(ctx, t, c, n = 26) { const r = rng(77); ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < n; i++) { const d = .4 + r() * 1.6, x = ((r() * W + t * (6 + r() * 10) * d - c.x * d * 1.4) % (W + 80) + W + 80) % (W + 80) - 40, y = r() * H + Math.sin(t * .5 + i) * 14 - c.y * d;
      const rr = d > 1.4 ? 7 + r() * 9 : 1.5 + r() * 2.5, g = ctx.createRadialGradient(x, y, 0, x, y, rr); g.addColorStop(0, `rgba(255,236,190,${d > 1.4 ? .18 : .55})`); g.addColorStop(1, 'rgba(255,236,190,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fill(); } ctx.restore(); }
  function drawShot(ctx, i, lt, t) { const s = list[i], start = s.t, end = (list[i + 1] || { t: END }).t, dur = end - start, R = k => TV[k] - start, L = LOOK[s.key] || { fg: 'none' }, c = cam(i, lt, dur, t);
    G.EP.frame = t; ctx.save(); ctx.translate(640 + c.x, 360 + c.y); ctx.scale(c.z, c.z); ctx.translate(-640, -360); s.fn(ctx, lt, dur, t, R); ctx.restore();
    if (L.rays) EF.beams(ctx, [980 - c.x * .3, -40], t, .07);
    mist(ctx, L.mist, t, c); if (L.dust) dust(ctx, t, c, 30); else dust(ctx, t, c, 10);
    foreground(ctx, L.fg, c, t, 40 + i); }
  const shots = list.map((s, i) => ({ start: s.t, end: (list[i + 1] || { t: END }).t, draw: (ctx, lt, dur, t) => {
    if (i > 0 && lt < XF) {   // dissolve: the previous shot (held at its last moment) under the new one fading in
      const p = list[i - 1]; drawShot(ctx, i - 1, s.t - p.t + lt, t);
      bctx.setTransform(1, 0, 0, 1, 0, 0); bctx.clearRect(0, 0, W, H); drawShot(bctx, i, lt, t); ctx.save(); ctx.globalAlpha = ease.inOut(lt / XF); ctx.drawImage(buf, 0, 0); ctx.restore(); }
    else drawShot(ctx, i, lt, t); } }));
  // subtitles: the supplied script, cued on the voice anchors (≤ 1 line, set in the bottom letterbox bar)
  const SUB = [['wake', "You wake up on the deck of a boat. It's July,"], ['river0', 'the air is already warm, and the river has swollen so wide'], ['river0', 'you can barely see the far bank.', 3.2],
    ['forty', 'Forty men are sleeping around you, wrapped in linen.'], ['cliff', 'Behind you rises a pale cliff of limestone'], ['cliff', 'with fresh chisel marks all over it.', 2.6],
    ['awake', 'And a few feet away, a man is already awake.'], ['reed', "He's holding a reed pen and a sheet of papyrus."], ['writes', 'He writes one line:'], ['where', 'where the team spent the night.'],
    ['away', 'Then he puts it away.'], ['name', 'His name is Merer.'], ['boss', "He's your boss."], ['today', 'And today, like most days this summer,'],
    ['block', 'your job is to move a block of stone about as heavy as a pickup truck'], ['across', 'across this river to a building site 10 miles away.'],
    ['strange', "Here's the strange part."], ['survived', 'That sheet of papyrus survived.'], ['fourthou', 'Four and a half thousand years later,'], ['fourthou', 'archaeologists pulled it out of a cave on the Red Sea coast.', 2.4],
    ['oldest', "It's the oldest inscribed papyrus ever found."], ['written', 'And it was written by a man who helped build the Great Pyramid.'],
    ['whips', 'So forget the whips.'], ['aliens', 'Forget the aliens.'], ['first', 'For the first time, we can ask the people who were actually there:'],
    ['allday', 'what did the pyramid builders do all day?'], ['fed', 'Who fed them?'], ['patched', 'Who patched them up?'], ['why', 'And why did they do it at all?'],
    ['answer', 'The answer starts with that one line.'], ['writeit', 'Write it down.'], ['king', "To understand Merer's day, we first need to talk about his king."],
    ['khufu', 'Khufu rules Egypt around 2,600 years before Jesus.'], ['dates', 'Nobody agrees on his exact dates;'], ['reign', 'one common estimate puts his reign at roughly 2589 to 2566 BC.'],
    ['people', "To his people, he isn't just a ruler."], ['god', "He's a god living on Earth,"], ['dies', 'and when he dies, he has to make it safely to the sky.'],
    ['launch', 'That trip needs a launch pad.'], ['orders', 'So Khufu orders the biggest building the world has ever seen:'], ['feet', 'a pyramid about 481 feet tall,'], ['feet', 'made of something like 2.3 million blocks.', 2.6],
    ['tallest', 'It will stay the tallest human-made structure on the planet for about 3,800 years.'], ['time', 'To put that in time:'],
    ['cleo', 'Cleopatra lived closer to the Moon landing than to the building of this pyramid.'], ['thinking', "Now, I know what you're thinking."], ['work', 'Somebody had to do the actual work.'],
    ['greek', "And for about 2,500 years, the world's answer"], ['greek', 'came from one Greek tourist.', 2.6]].map(([k, s, off = 0]) => ({ t: TV[k] + off - .1, s }));
  function subtitle(ctx, t) { let cur = null; for (let i = 0; i < SUB.length; i++) if (t >= SUB[i].t && t < Math.min((SUB[i + 1] || { t: END }).t, SUB[i].t + 6.5)) cur = SUB[i]; if (!cur) return;
    const a = clamp((t - cur.t) / .15); ctx.save(); ctx.globalAlpha = a; ctx.font = '600 25px Fredoka'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#f4ede0';
    let sz = 25; while (ctx.measureText(cur.s).width > W - 120 && sz > 18) { sz--; ctx.font = `600 ${sz}px Fredoka`; } ctx.fillText(cur.s, W / 2, H - 31); ctx.restore(); }
  G.TOON_FINISH = { grain: .045, vignette: .5 };
  const pb = document.createElement('canvas'), bl = document.createElement('canvas'); pb.width = W; pb.height = H; bl.width = 320; bl.height = 180;
  const pg = pb.getContext('2d'), blg = bl.getContext('2d');
  G.TOON_POST = (ctx, t) => {   // cinematic grade: lifted contrast, teal shadows / warm highlights, bloom; then letterbox + subtitles
    pg.filter = 'saturate(1.12) contrast(1.16) brightness(1.02)'; pg.clearRect(0, 0, W, H); pg.drawImage(ctx.canvas, 0, 0); ctx.drawImage(pb, 0, 0);
    blg.filter = 'brightness(1.3) contrast(1.7) blur(7px)'; blg.clearRect(0, 0, 320, 180); blg.drawImage(ctx.canvas, 0, 0, 320, 180);
    ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .18; ctx.drawImage(bl, 0, 0, W, H);
    ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .22; const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#2a6a80'); g.addColorStop(.55, '#a08060'); g.addColorStop(1, '#ff9a4a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .1; ctx.drawImage(G.Paint2.canvasTex(), 0, 0);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    const ib = clamp(t / 1.2), ob = clamp((END - t) / 1.5); ctx.fillStyle = '#000';
    if (ib < 1 || ob < 1) { ctx.globalAlpha = 1 - Math.min(ib, ob); ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }   // fade from / to black
  };
  G.CINE_SUBS = SUB.map((x, i) => ({ t0: x.t, t1: Math.min((SUB[i + 1] || { t: END }).t, x.t + 6.5), s: x.s }));
  G.Show = { duration: END, narration: 'assets/audio/narration.mp3', shots, sfx: EP.sfx.filter(s => s.t < END), moods: EP.moods.filter(m => m.t < END).sort((a, b) => a.t - b.t), images: {},
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '500 26px Fredoka', '46px "Luckiest Guy"'] };
})(window);
