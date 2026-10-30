/* assemble "The Life of the Mona Lisa": shots + transitions, the era badge and HANDS counter (top-left), question
 * tickets (top-right), music moods, colour grade. */
(function (G) {
  'use strict';
  G.Guide.straight = true;
  const T = G.Toon, DR = G.DR, K2 = G.K2, EP = G.EP, { W, H, clamp, lerp } = T, TAU = Math.PI * 2, MK = DR.MK;
  const DUR = 1155, END = 1148.6, shots = G.SALT2.build(DUR);
  const ERAS = K2.ERAS.sort((a, b) => a.t - b.t), HANDS = K2.HANDS.sort((a, b) => a.t - b.t);
  function badge(ctx, t) { const e = ERAS.filter(x => x.t <= t).pop(); if (!e) { G.UI.keepOut = null; return; } const lt = t - e.t, k = clamp(lt / .35), fl = clamp((lt - .1) / .3);
    const hs = HANDS.filter(x => x.t <= t), hc = hs.length ? hs[hs.length - 1] : null, hk = hc ? clamp((t - hc.t) / .4) : 0, big = hc ? clamp(1 - (t - hc.t - 1.6) / .5) : 0;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.font = MK(26); const w = Math.max(ctx.measureText(e.label).width, ctx.measureText(e.year).width) + 110; ctx.restore();
    G.UI.keepOut = [16, 16, 16 + w + 10, 16 + 96]; G.UI.box(ctx, 16 + w / 2, 60, w, 96, c => { c.save(); c.translate(16, 16); c.globalAlpha = .92;
      c.fillStyle = 'rgba(10,6,4,.35)'; c.beginPath(); c.roundRect(5, 6, w, 84, 14); c.fill(); c.fillStyle = '#f6f0e2'; c.beginPath(); c.roundRect(0, 0, w, 84, 14); c.fill(); c.lineWidth = 4; c.strokeStyle = '#15100c'; c.stroke();
      // the HANDS counter: a glove icon with a number badge
      c.save(); c.translate(42, 46); c.fillStyle = '#fff'; c.strokeStyle = '#15100c'; c.lineWidth = 3; c.beginPath(); c.roundRect(-16, -8, 32, 30, 8); c.fill(); c.stroke(); for (let i = 0; i < 4; i++) { c.beginPath(); c.roundRect(-15 + i * 8, -30, 7, 26, 3.5); c.fill(); c.stroke(); } c.beginPath(); c.roundRect(14, -4, 12, 7, 3.5); c.fill(); c.stroke(); c.fillStyle = '#c8281e'; c.fillRect(-16, 18, 32, 8); c.restore();
      if (hc) { c.save(); c.translate(64, 64); const s = 1 + (1 - hk) * .8; c.scale(s, s); c.fillStyle = '#c8281e'; c.beginPath(); c.arc(0, 0, 17, 0, TAU); c.fill(); c.lineWidth = 3; c.strokeStyle = '#fff'; c.stroke(); c.font = MK(22); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(hc.n), 0, 1); c.restore(); }
      c.globalAlpha = .92 * Math.max(.0, fl); c.font = MK(26); c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = '#15100c'; c.fillText(e.label, 92, 28); c.fillStyle = '#c8281e'; c.fillText(e.year, 92, 60); c.restore(); }, { free: true, keep: true });
    if (hc && big > 0 && t - hc.t < 2.1 && hc.who) { const k2 = G.GX.pop(t - hc.t, 0, .35); G.UI.box(ctx, 640, 520, 560, 90, c => { c.save(); c.translate(640, 520); c.scale(k2 * big, k2 * big); c.fillStyle = 'rgba(10,6,4,.4)'; c.beginPath(); c.roundRect(-264, -36, 540, 80, 16); c.fill(); c.fillStyle = '#c8281e'; c.beginPath(); c.roundRect(-270, -42, 540, 80, 16); c.fill(); c.lineWidth = 5; c.strokeStyle = '#15100c'; c.stroke();
      c.font = MK(36); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(`HANDS #${hc.n}: ${hc.who}`, 0, 2); c.restore(); }, { keep: true }); } }
  for (const s of shots) { const d = s.draw; s.draw = (ctx, lt, dur, t) => { d(ctx, lt, dur, t); if (t < END) { badge(ctx, t); if (EP.drawTickets) EP.drawTickets(ctx, t); } else G.UI.keepOut = null; }; }
  G.TOON_FINISH = { grain: .018, vignette: .26 };
  const buf = document.createElement('canvas'), bl = document.createElement('canvas'); buf.width = 1280; buf.height = 720; bl.width = 320; bl.height = 180;
  const bg = buf.getContext('2d'), blg = bl.getContext('2d');
  G.TOON_POST = (ctx) => {
    bg.filter = 'saturate(1.14) contrast(1.05) brightness(1.03)'; bg.clearRect(0, 0, 1280, 720); bg.drawImage(ctx.canvas, 0, 0, 1280, 720); ctx.drawImage(buf, 0, 0, 1280, 720);
    blg.filter = 'brightness(1.25) contrast(1.6) blur(6px)'; blg.clearRect(0, 0, 320, 180); blg.drawImage(ctx.canvas, 0, 0, 320, 180);
    ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .1; ctx.drawImage(bl, 0, 0, 1280, 720);
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .12; ctx.drawImage(G.Paint2.canvasTex(), 0, 0, 1280, 720);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; };
  G.Show = { duration: DUR, narration: 'assets/audio/narration.mp3', shots, sfx: [], moods: EP.moods.slice().sort((a, b) => a.t - b.t), images: {}, cues: G.CUES,
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '46px "Luckiest Guy"', '40px "Permanent Marker"', '30px "Patrick Hand"', '40px "Lilita One"', '40px Anton'] };
})(window);
