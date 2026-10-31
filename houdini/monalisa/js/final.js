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
  // ---------- REAL-PHOTO COLLAGE (user's reference photos as taped prints / torn cut-outs) ----------
  const IMGS = ['mona_lisa', 'the_mona_lisas_room_in_the_louvre', 'the_mona_lisas_room_in_the_louvre_2', 'muses_at_the_musee_du_louvre_louis_beroud_1852_1930', 'beroud', 'leonardo_da_vinci', 'vasari', 'vasari_2', 'salai_2',
    'francis_i', 'francis_i_2', 'francis_i_4', 'louis_xiv', 'napoleon_and_josephine_3', 'napoleon_and_josephine_4', 'peruggia_his_mugshot_is_famous', 'vincenzo_peruggia', 'valfierno', 'apollinaire', 'picasso_3', 'geri_and_poggi', 'giovanni_poggi_historian',
    'jacques_jaujard_civilian', 'rose_valland', 'rose_valland_2', 'the_jewish_families_whose_art_was_looted', 'the_ss_france', 'the_ss_france_2', 'jacqueline_kennedy', 'jacqueline_kennedy_2', 'jfk', 'jfk_2', 'malraux', 'the_national_gallery_in_washington_1963',
    'the_cake_and_soup_attackers_mona_lisa', 'the_cake_and_soup_attackers_mona_lisa_2', 'the_2025_thieves_monalisa'];
  const images = {}; IMGS.forEach(k => images[k] = 'assets/img/' + k + '.jpg');
  const tl = n => C.t(n, null), C = G.C;
  // [from line, to line (exclusive), key, x, y, w, rot, caption, crop, sepia]
  const PH = [[3, 4, 'the_mona_lisas_room_in_the_louvre', 1090, 520, 230, .06, 'THE REAL ROOM'], [8, 9, 'the_mona_lisas_room_in_the_louvre_2', 190, 470, 220, -.08, 'BEHIND THE GLASS'],
    [15, 17, 'beroud', 1100, 330, 170, .06, 'LOUIS BÉROUD', null, .3], [23, 25, 'muses_at_the_musee_du_louvre_louis_beroud_1852_1930', 1110, 330, 180, .08, 'A BÉROUD PAINTING'],
    [27, 28, 'mona_lisa', 1100, 470, 170, .08, 'THE REAL ONE'], [43, 44, 'mona_lisa', 1100, 420, 180, .07, 'LISA, BY LEONARDO'],
    [53, 55, 'leonardo_da_vinci', 1110, 470, 170, .06, 'LEONARDO'], [67, 68, 'vasari', 1100, 470, 170, .06, 'GIORGIO VASARI'], [88, 89, 'salai_2', 1110, 470, 150, .07, "SALAÌ'S OWN WORK"],
    [86, 88, 'francis_i', 1100, 360, 180, .07, 'FRANCIS I'], [99, 100, 'louis_xiv', 1110, 360, 160, .06, 'LOUIS XIV'], [107, 108, 'francis_i_2', 1110, 360, 190, .07, 'NAPOLEON, CROWNED'],
    [108, 109, 'napoleon_and_josephine_3', 230, 520, 260, -.05, 'NAPOLEON & JOSÉPHINE'], [126, 127, 'vasari_2', 160, 520, 170, -.07, 'VASARI'], [146, 148, 'peruggia_his_mugshot_is_famous', 1110, 470, 190, .06, 'POLICE FILE, 1909', null, .2],
    [149, 150, 'valfierno', 180, 470, 170, -.06, 'PERUGGIA', null, .3], [173, 174, 'apollinaire', 1110, 420, 170, .06, 'APOLLINAIRE'], [174, 175, 'picasso_3', 1110, 420, 180, .06, 'PICASSO (LATER)'],
    [186, 187, 'vincenzo_peruggia', 1110, 430, 170, .06, 'THE THIEF', null, .2], [191, 192, 'giovanni_poggi_historian', 1110, 430, 160, .06, 'GIOVANNI POGGI'], [193, 196, 'geri_and_poggi', 1060, 520, 290, .05, 'FLORENCE, DEC 1913'],
    [224, 226, 'jacques_jaujard_civilian', 1110, 470, 170, .06, 'JACQUES JAUJARD'], [235, 237, 'the_jewish_families_whose_art_was_looted', 1100, 470, 200, .05, 'A FAMILY · A COLLECTION', null, .2],
    [237, 238, 'rose_valland', 1110, 430, 160, .06, 'ROSE VALLAND'], [238, 239, 'rose_valland_2', 200, 480, 260, -.05, 'RECOVERED ART, 1945', [0, 0, .5, 1]],
    [248, 249, 'the_ss_france_2', 1050, 560, 290, .05, 'SS FRANCE, 1962'], [249, 250, 'jacqueline_kennedy', 1110, 430, 170, .06, 'JACQUELINE KENNEDY'], [249, 250, 'malraux', 170, 430, 160, -.06, 'ANDRÉ MALRAUX'],
    [253, 254, 'jfk', 1120, 360, 160, .06, 'JFK'], [255, 258, 'the_national_gallery_in_washington_1963', 1060, 540, 280, .05, 'WASHINGTON, 1963'],
    [264, 265, 'the_cake_and_soup_attackers_mona_lisa_2', 1070, 540, 270, .05, '2024: SOUP'], [265, 267, 'the_cake_and_soup_attackers_mona_lisa', 210, 520, 260, -.05, 'JAN 2024'],
    [268, 270, 'the_2025_thieves_monalisa', 1060, 540, 280, .05, 'OCTOBER 2025'], [273, 274, 'the_mona_lisas_room_in_the_louvre', 1080, 560, 250, .05, 'HER ROOM TODAY'],
    [286, 287, 'leonardo_da_vinci', 1100, 330, 150, .06, ''], [287, 288, 'francis_i', 1100, 330, 150, .06, ''], [288, 289, 'francis_i_2', 1100, 330, 160, .06, ''], [289, 290, 'peruggia_his_mugshot_is_famous', 1100, 330, 160, .06, ''],
    [290, 291, 'jacques_jaujard_civilian', 1100, 330, 160, .06, ''], [291, 292, 'jacqueline_kennedy', 1100, 330, 150, .06, '']];
  function photos(ctx, t) { for (const [a, b, key, x, y, w, rot, cap, crop, sep] of PH) { const t0 = tl(a) + .25, t1 = tl(b); if (t < t0 || t > t1) continue; const k = G.GX.pop(t - t0, 0, .35), out = clamp((t1 - t) / .2);
      const im = G.Toon.IMG[key]; if (!im) continue; const [, , fw, fh] = crop || [0, 0, 1, 1], h = w * im.height * fh / (im.width * fw);
      G.UI.box(ctx, x, y, w + 40, h + 80, c => { c.save(); c.globalAlpha = out; G.CL.photo(c, key, x + (x > 640 ? 1 : -1) * (1 - k) * 300, y, w, rot + Math.sin(t * 1.3) * .015, { k: Math.max(.01, k), caption: cap, crop, sepia: sep, style: cap ? 'polaroid' : 'torn' }); c.restore(); }); } }
  // era pools for dressing plain backgrounds
  const POOLS = [[0, [['mona_lisa'], ['the_mona_lisas_room_in_the_louvre'], ['muses_at_the_musee_du_louvre_louis_beroud_1852_1930']]], [100, [['mona_lisa'], ['leonardo_da_vinci'], ['vasari']]],
    [295, [['francis_i'], ['louis_xiv'], ['francis_i_2'], ['napoleon_and_josephine_4']]], [425, [['vasari_2'], ['mona_lisa'], ['muses_at_the_musee_du_louvre_louis_beroud_1852_1930']]],
    [524, [['peruggia_his_mugshot_is_famous', null, .3], ['apollinaire'], ['geri_and_poggi'], ['valfierno', null, .3]]], [811, [['jacques_jaujard_civilian'], ['rose_valland'], ['rose_valland_2', [0, 0, .5, 1]]]],
    [894, [['mona_lisa'], ['the_mona_lisas_room_in_the_louvre_2'], ['rose_valland']]], [920, [['the_ss_france_2'], ['jacqueline_kennedy_2'], ['jfk_2'], ['the_national_gallery_in_washington_1963']]], [1004, [['the_mona_lisas_room_in_the_louvre_2'], ['the_cake_and_soup_attackers_mona_lisa'], ['the_2025_thieves_monalisa'], ['mona_lisa']]]];
  for (const s of shots) { const d = s.draw; s.draw = (ctx, lt, dur, t) => { G.CL.pool(POOLS.filter(p => p[0] <= t).pop()[1]); d(ctx, lt, dur, t); if (t < END) { photos(ctx, t); badge(ctx, t); if (EP.drawTickets) EP.drawTickets(ctx, t); } else G.UI.keepOut = null; }; }
  G.TOON_FINISH = { grain: .018, vignette: .26 };
  const buf = document.createElement('canvas'), bl = document.createElement('canvas'); buf.width = 1280; buf.height = 720; bl.width = 320; bl.height = 180;
  const bg = buf.getContext('2d'), blg = bl.getContext('2d');
  G.TOON_POST = (ctx) => {
    bg.filter = 'saturate(1.14) contrast(1.05) brightness(1.03)'; bg.clearRect(0, 0, 1280, 720); bg.drawImage(ctx.canvas, 0, 0, 1280, 720); ctx.drawImage(buf, 0, 0, 1280, 720);
    blg.filter = 'brightness(1.25) contrast(1.6) blur(6px)'; blg.clearRect(0, 0, 320, 180); blg.drawImage(ctx.canvas, 0, 0, 320, 180);
    ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .1; ctx.drawImage(bl, 0, 0, 1280, 720);
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .12; ctx.drawImage(G.Paint2.canvasTex(), 0, 0, 1280, 720);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; };
  G.Show = { duration: DUR, narration: 'assets/audio/narration.mp3', shots, sfx: [], moods: EP.moods.slice().sort((a, b) => a.t - b.t), images, cues: G.CUES,
    fonts: ['700 26px Fredoka', '600 26px Fredoka', '46px "Luckiest Guy"', '40px "Permanent Marker"', '30px "Patrick Hand"', '40px "Lilita One"', '40px Anton'] };
})(window);
