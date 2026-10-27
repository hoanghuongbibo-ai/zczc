/* "It's About Salt" — the remake: shot registry + transitions.
 *   C(n, k, fn, tr)   shot starting at word k of transcript line n (k null = the line's first word; k may be {off} too)
 *   C.at(sec, fn, tr) shot at an absolute time
 *   tr = 'whip' | 'whipL' | 'dissolve' | 'flash' | 'ink' | 'dip' | 'zoom'  (default: hard cut), or { type, d }
 *   fn(ctx, lt, dur, t, R) where R(n[, k]) = a line's / word's time relative to the shot start. */
(function (G) {
  'use strict';
  const T = G.Toon, { W, H, clamp, lerp } = T, TV = G.TV, TW = G.TW, LIST = [];
  const tOf = (n, k) => k == null ? TV['L' + n] : typeof k === 'number' ? (TW[n][Math.min(k, TW[n].length - 1)] ?? TV['L' + n]) : TV['L' + n] + (k.off || 0);
  const C = G.C = (n, k, fn, tr) => LIST.push({ t: Math.max(0, tOf(n, k) - .04), fn, tr });
  C.at = (sec, fn, tr) => LIST.push({ t: sec, fn, tr });
  C.t = tOf;
  G.SALT2 = { LIST };
  const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
  const pc = mk(), pg = pc.getContext('2d'), cc = mk(), cg = cc.getContext('2d');
  const easeIO = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
  function build(DUR) {
    const L = LIST.slice().sort((a, b) => a.t - b.t); const shots = [];
    L.forEach((s, i) => { const start = s.t, end = (L[i + 1] || { t: DUR }).t, prev = L[i - 1], R = (n, k) => tOf(n, k) - start;
      const run = (ctx, sh, t) => { const st = sh.t, en = (L[L.indexOf(sh) + 1] || { t: DUR }).t, Rp = (n, k) => tOf(n, k) - st; ctx.save(); sh.fn(ctx, t - st, en - st, t, Rp); ctx.restore(); };
      shots.push({ start, end, draw: (ctx, lt, dur, t) => { G.EP.frame = t; const tr = typeof s.tr === 'string' ? { type: s.tr } : s.tr, td = tr ? Math.min((end - start) * .45, tr.d || (tr.type === 'ink' ? .7 : tr.type === 'dissolve' ? .5 : .32)) : 0;
        if (!tr || !prev || lt >= td) { run(ctx, s, t); return; }
        const k = clamp(lt / td), e = easeIO(k), type = tr.type;
        G.UI.mute = true; pg.setTransform(1, 0, 0, 1, 0, 0); pg.fillStyle = '#000'; pg.fillRect(0, 0, W, H); run(pg, prev, t); G.UI.mute = type === 'whip' || type === 'whipL' || (type === 'ink' && k < .5);
        cg.setTransform(1, 0, 0, 1, 0, 0); cg.fillStyle = '#000'; cg.fillRect(0, 0, W, H); run(cg, s, t); G.UI.mute = false;
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (type === 'whip' || type === 'whipL') { const d = type === 'whip' ? -1 : 1, off = W * e;
          ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
          for (let j = 0; j < 6; j++) { const sm = (j - 2.5) * 34 * Math.sin(k * Math.PI); ctx.globalAlpha = j ? .3 : 1; ctx.drawImage(pc, d * off + sm, 0); ctx.drawImage(cc, d * off - d * W + sm, 0); } }
        else if (type === 'dissolve') { ctx.drawImage(cc, 0, 0); ctx.globalAlpha = 1 - e; ctx.drawImage(pc, 0, 0); }
        else if (type === 'flash') { ctx.drawImage(cc, 0, 0); ctx.globalAlpha = Math.pow(1 - k, 2); ctx.fillStyle = '#fffaf0'; ctx.fillRect(0, 0, W, H); }
        else if (type === 'dip') { ctx.drawImage(k < .5 ? pc : cc, 0, 0); ctx.globalAlpha = 1 - Math.abs(k - .5) * 2; ctx.fillStyle = '#0a0806'; ctx.fillRect(0, 0, W, H); }
        else if (type === 'zoom') { const z = 1 + e * .6; ctx.drawImage(cc, 0, 0); ctx.globalAlpha = 1 - e; ctx.translate(640, 360); ctx.scale(z, z); ctx.translate(-640, -360); ctx.drawImage(pc, 0, 0); }
        else if (type === 'ink') { ctx.drawImage(k < .5 ? pc : cc, 0, 0); const cov = k < .5 ? k * 2 : (1 - k) * 2; ctx.fillStyle = '#1a1622';   // dark cloud wipe
          for (let j = 0; j < 14; j++) { const a = j / 14 * Math.PI * 2, rx = 640 + Math.cos(a) * 760, ry = 360 + Math.sin(a) * 520, r = 380 * easeIO(cov) * (1 + (j % 3) * .25); ctx.beginPath(); ctx.arc(lerp(rx, 640, cov * .35), lerp(ry, 360, cov * .35), r, 0, Math.PI * 2); ctx.fill(); }
          if (cov > .85) ctx.fillRect(0, 0, W, H); }
        ctx.restore(); } }); });
    return shots; }
  G.SALT2.build = build;
})(window);
