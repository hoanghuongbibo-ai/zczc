/* assemble "Did Medieval Peasants Work Less Than You?": shots + transitions, the era badge with the EGG COUNTER
 * (top-left), the PTO meter (cold open + close), question tickets, real-photo collage inserts, music moods, grade. */
(function (G) {
  'use strict';
  G.Guide.straight = true; G.UI.keepOutAny = true;
  const T = G.Toon, DR = G.DR, K2 = G.K2, EP = G.EP, C = G.C, { W, H, clamp, lerp } = T, TAU = Math.PI * 2, MK = DR.MK;
  const DUR = 1132, END = 1126, shots = G.SALT2.build(DUR), tl = n => C.t(n, null);
  const ERAS = K2.ERAS.sort((a, b) => a.t - b.t), EGGS = (G.EGGS || []).sort((a, b) => a.t - b.t);
  const egg = (c, x, y, s, fire, t) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#fbf3e0'; c.strokeStyle = '#15100c'; c.lineWidth = 3; c.beginPath(); c.ellipse(0, 0, 12, 16, 0, 0, TAU); c.fill(); c.stroke(); c.fillStyle = 'rgba(200,170,120,.4)'; c.beginPath(); c.ellipse(4, 5, 5, 7, 0, 0, TAU); c.fill();
    if (fire) { for (let i = 0; i < 5; i++) { const k = (t * 3 + i / 5) % 1; c.fillStyle = `rgba(255,${120 + i * 20},40,${1 - k})`; c.beginPath(); c.arc(-10 + i * 5, -14 - k * 26, 6 * (1 - k) + 2, 0, TAU); c.fill(); } } c.restore(); };
  function badge(ctx, t) { const e = ERAS.filter(x => x.t <= t).pop(); if (!e) { G.UI.keepOut = null; return; } const lt = t - e.t, fl = clamp((lt - .1) / .3);
    const ec = EGGS.filter(x => x.t <= t).pop(), ek = ec ? clamp((t - ec.t) / .4) : 0;
    ctx.save(); ctx.font = MK(26); const w = Math.max(ctx.measureText(e.label).width, ctx.measureText(e.year).width) + 116; ctx.restore();
    G.UI.keepOut = [16, 16, 16 + w + 10, 16 + 96]; G.UI.box(ctx, 16 + w / 2, 60, w, 96, c => { c.save(); c.translate(16, 16); c.globalAlpha = .94;
      c.fillStyle = 'rgba(10,6,4,.35)'; c.beginPath(); c.roundRect(5, 6, w, 84, 14); c.fill(); c.fillStyle = '#f6efe0'; c.beginPath(); c.roundRect(0, 0, w, 84, 14); c.fill(); c.lineWidth = 4; c.strokeStyle = '#15100c'; c.stroke();
      // egg counter
      if (ec && ec.n !== null) { egg(c, 40, 40, 1.3, ec.fire, t); c.save(); c.translate(60, 62); const s = 1 + (1 - ek) * .8; c.scale(s, s); c.fillStyle = ec.fire ? '#e8862a' : '#c8281e'; c.beginPath(); c.arc(0, 0, 16, 0, TAU); c.fill(); c.lineWidth = 3; c.strokeStyle = '#fff'; c.stroke(); c.font = MK(20); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(ec.n), 0, 1); c.restore(); }
      else { c.save(); c.translate(40, 42); c.strokeStyle = '#5a3a22'; c.lineWidth = 4; c.beginPath(); c.arc(0, 0, 18, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -12); c.moveTo(0, 0); c.lineTo(9, 4); c.stroke(); c.restore(); }
      c.globalAlpha = .94 * fl; c.font = MK(26); c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = '#15100c'; c.fillText(e.label, 92, 28); c.fillStyle = '#c8281e'; c.fillText(e.year, 92, 60); c.restore(); }, { free: true, keep: true }); }
  // PTO meter (bottom-right) — the cold open and the close
  const PTO = G.PTO || [];
  function pto(ctx, t) { const p = PTO.find(q => t >= q.a && t < q.b); if (!p) return; const k = clamp((t - p.a) / .4) * clamp((p.b - t) / .3), v = lerp(p.v0, p.v1, clamp((t - p.a) / Math.max(.1, p.b - p.a - .5)));
    G.UI.box(ctx, 1120, 660, 280, 70, c => { c.save(); c.translate(1120, 660 + (1 - k) * 120); c.fillStyle = 'rgba(10,6,4,.35)'; c.beginPath(); c.roundRect(-126, -26, 260, 60, 12); c.fill(); c.fillStyle = '#1e2430'; c.beginPath(); c.roundRect(-130, -30, 260, 60, 12); c.fill(); c.lineWidth = 3; c.strokeStyle = '#5a6a80'; c.stroke();
      c.font = MK(20); c.fillStyle = '#9ab0c8'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('PTO LEFT', -116, -10); c.fillStyle = '#2a3440'; c.fillRect(-116, 6, 170, 14); c.fillStyle = v < .2 ? '#ff5a3a' : '#3ab88a'; c.fillRect(-116, 6, 170 * v, 14); c.font = MK(26); c.fillStyle = '#fff'; c.textAlign = 'right'; c.fillText(Math.round(v * 15) + 'd', 118, 4); c.restore(); }, { free: true, keep: true }); }
  // ---------- real photos (the user's asset pack) ----------
  const IM = ['froissart', 'froissart_2', 'longhouse', 'longhouse_2', 'quern', 'quern_2', 'court_roll', 'court_roll_2', 'edward_i', 'edward_i_2', 'edward_ii', 'edward_iii', 'edward_iii_2', 'ekirch', 'luttrell', 'peterborough', 'peterborough_2', 'peterborough_3', 'peterborough_4', 'peterborough_5', 'peterborough_6',
    'schor', 'schor_2', 'weisdorf', 'statute', 'hundred_rolls_2', 'tournai', 'tournai_1', 'tournai_2', 'laxton', 'laxton_2'];
  const images = {}; IM.forEach(k => images[k] = 'assets/img/' + k + '.jpg');
  const PH = G.MED_PHOTOS || [];
  function photos(ctx, t) { for (const [a, b, key, x, y, w, rot, cap, crop, sep] of PH) { const t0 = tl(a) + .25, t1 = b > 900 ? b : tl(b); if (t < t0 || t > t1) continue; const k = G.GX.pop(t - t0, 0, .35), out = clamp((t1 - t) / .2);
      const im = T.IMG[key]; if (!im) continue; const [, , fw, fh] = crop || [0, 0, 1, 1], h = w * im.height * fh / (im.width * fw);
      G.UI.box(ctx, x, y, w + 40, h + 80, c => { c.save(); c.globalAlpha = out; G.CL.photo(c, key, x + (x > 640 ? 1 : -1) * (1 - k) * 300, y, w, rot + Math.sin(t * 1.3) * .015, { k: Math.max(.01, k), caption: cap, crop, sepia: sep, style: cap ? 'polaroid' : 'torn' }); c.restore(); }); } }
  const POOLS = [[0, [['luttrell'], ['peterborough']]], [89, [['peterborough'], ['peterborough_5'], ['hundred_rolls_2'], ['luttrell']]], [300, [['longhouse'], ['quern_2'], ['luttrell'], ['laxton']]],
    [690, [['laxton_2'], ['luttrell'], ['peterborough_6']]], [770, [['tournai'], ['tournai_1'], ['tournai_2']]], [880, [['statute'], ['edward_iii'], ['froissart']]], [1000, [['froissart'], ['froissart_2'], ['statute']]], [1040, [['luttrell'], ['peterborough_3'], ['laxton']]]];
  for (const s of shots) { const d = s.draw; s.draw = (ctx, lt, dur, t) => { G.CL.pool((POOLS.filter(p => p[0] <= t).pop() || [0, []])[1]); const nSeg = dur >= 7 ? Math.max(2, Math.round(dur / 3)) : 1, seg = Math.min(nSeg - 1, Math.floor(lt / (dur / nSeg))), PZ = [[1, 0, 0], [1.12, -40, -10], [1.05, 50, 0], [1.16, 20, -16]][seg % 4]; G.DR.punch = seg ? { z: PZ[0], dx: PZ[1], dy: PZ[2] } : null; d(ctx, lt, dur, t); G.DR.punch = null; if (t < END) { photos(ctx, t); pto(ctx, t); badge(ctx, t); const tk = (EP.tickets || []).filter(q => t >= q.from && t < q.to); if (tk.length) { const k0 = G.UI.keepOut; G.UI.keepOut = (k0 ? [k0] : [[-99, -99, -98, -98]]).concat(tk.map((q, i) => [W - 470, 50 + i * 62 - 28, W - 30, 50 + i * 62 + 28])); } if (EP.drawTickets) EP.drawTickets(ctx, t); } else G.UI.keepOut = null; }; }
  G.TOON_FINISH = { grain: .02, vignette: .3 };
  const buf = document.createElement('canvas'), bl = document.createElement('canvas'); buf.width = 1280; buf.height = 720; bl.width = 320; bl.height = 180;
  const bg = buf.getContext('2d'), blg = bl.getContext('2d');
  G.TOON_POST = (ctx, t) => { const grim = (G.GRIM || []).some(([a, b]) => t >= a && t < b);
    bg.filter = grim ? 'saturate(.55) contrast(1.08) brightness(.96)' : 'saturate(1.16) contrast(1.05) brightness(1.03)'; bg.clearRect(0, 0, 1280, 720); bg.drawImage(ctx.canvas, 0, 0, 1280, 720); ctx.drawImage(buf, 0, 0, 1280, 720);
    blg.filter = 'brightness(1.25) contrast(1.6) blur(6px)'; blg.clearRect(0, 0, 320, 180); blg.drawImage(ctx.canvas, 0, 0, 320, 180);
    ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .1; ctx.drawImage(bl, 0, 0, 1280, 720);
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .14; ctx.drawImage(G.Paint2.canvasTex(), 0, 0, 1280, 720);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; };
  G.Show = { duration: DUR, narration: 'assets/audio/narration.mp3', shots, sfx: [], moods: EP.moods.slice().sort((a, b) => a.t - b.t), images, cues: G.CUES,
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '46px "Luckiest Guy"', '40px "Permanent Marker"', '30px "Patrick Hand"', '40px "Lilita One"', '40px Anton'] };
})(window);
