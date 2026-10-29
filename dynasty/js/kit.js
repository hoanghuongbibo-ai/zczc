/* Kit for the comedy-history style (dynasty/): text, pops, and the on-screen HUD that carries the show —
 * date tag (bottom-right), "now" badge (top-left), question tracker cards (top-right, ✗ → ✓), hanging counter
 * sign, stamps, marker labels with hand-drawn arrows, calendars, paper cards for real paintings/photos. */
(function (G) {
  'use strict';
  const T = G.Toon, W = T.W, H = T.H;
  const INK = '#231a14';
  const clamp = T.clamp, lerp = T.lerp;
  const out = k => 1 - Math.pow(1 - clamp(k), 3), inout = k => T.ease.inOut(clamp(k));
  const back = (k, s = 1.9) => { k = clamp(k); const c = s + 1; return 1 + c * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2); };
  const popK = (lt, d = .32) => lt <= 0 ? 0 : back(lt / d);                 // overshoot scale-in
  const DISPLAY = px => `${px}px "Luckiest Guy", "Fredoka", sans-serif`;
  const MARKER = px => `${px}px "Permanent Marker", "Fredoka", sans-serif`;
  const ROUND = (px, w = 700) => `${w} ${px}px Fredoka, sans-serif`;
  const sh = (ctx, path, fill, lw = 4, stroke = INK) => {
    ctx.beginPath(); path(ctx);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = ctx.lineCap = 'round'; ctx.stroke(); }
  };

  // ---------- text ----------
  function txt(ctx, s, x, y, font, fill = INK, align = 'center', a = 1, o = {}) {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= clamp(a); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); if (o.scale) ctx.scale(o.scale, o.scale);
    ctx.font = font; ctx.textAlign = align; ctx.textBaseline = 'middle';
    if (o.stroke) { ctx.lineWidth = o.stroke; ctx.strokeStyle = o.strokeColor || INK; ctx.lineJoin = 'round'; ctx.strokeText(s, 0, 0); }
    ctx.fillStyle = fill; ctx.fillText(s, 0, 0); ctx.restore();
  }
  // Big chunky caption: white fill, thick black outline, slight tilt, pops in.
  function title(ctx, s, x, y, lt, o = {}) {
    if (lt <= 0) return;
    const k = popK(lt, o.d || .35), px = o.size || 64;
    txt(ctx, s, x + 4, y + 6, DISPLAY(px), 'rgba(0,0,0,.35)', o.align || 'center', 1, { rot: o.rot ?? -.03, scale: k });
    txt(ctx, s, x, y, DISPLAY(px), o.fill || '#fff', o.align || 'center', 1, { rot: o.rot ?? -.03, scale: k, stroke: px * .2 });
  }
  // Rich text: segments [[text, color], ...] drawn left→right from x (left-aligned).
  function rich(ctx, segs, x, y, font, a = 1, o = {}) {
    ctx.save(); ctx.globalAlpha *= a; ctx.font = font; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    let xx = x;
    for (const [s, c] of segs) { if (o.stroke) { ctx.lineWidth = o.stroke; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.strokeText(s, xx, y); } ctx.fillStyle = c; ctx.fillText(s, xx, y); xx += ctx.measureText(s).width; }
    ctx.restore(); return xx - x;
  }
  const measure = (ctx, s, font) => { ctx.save(); ctx.font = font; const w = ctx.measureText(s).width; ctx.restore(); return w; };

  // ---------- HUD: bottom-right date tag (slanted parallelogram) ----------
  // dateTag(ctx, '1600 B.C.', lt, { hold: 4, sub }) — slides in from the right, holds, slides out.
  function dateTag(ctx, s, lt, o = {}) {
    if (lt <= 0) return;
    const hold = o.hold ?? 99, kin = out(lt / .3), kout = lt > hold ? out((lt - hold) / .3) : 0;
    if (kout >= 1) return;
    const px = o.size || 30, wTxt = measure(ctx, s, DISPLAY(px)), w = wTxt + 54, h = px + 22;
    const x = W - 18 - w + (1 - kin) * (w + 40) + kout * (w + 40), y = H - 18 - h;
    ctx.save();
    sh(ctx, T.poly([[x + 16, y + 5], [x + w + 5, y + 5], [x + w - 11, y + h + 5], [x, y + h + 5]]), 'rgba(0,0,0,.35)', 0);
    sh(ctx, T.poly([[x + 16, y], [x + w, y], [x + w - 16, y + h], [x, y + h]]), o.fill || '#f6efd7', 4.5);
    txt(ctx, s, x + w / 2, y + h / 2 + 2, DISPLAY(px), INK);
    ctx.restore();
  }
  // Dark lower-third variant: big name + small year under it.
  function lowerThird(ctx, name, sub, lt, o = {}) {
    if (lt <= 0) return;
    const hold = o.hold ?? 99, kin = out(lt / .35), kout = lt > hold ? out((lt - hold) / .3) : 0; if (kout >= 1) return;
    const w = Math.max(measure(ctx, name, DISPLAY(26)), 120) + 70, h = 64, x = W - 20 - w + (1 - kin + kout) * (w + 40), y = H - 22 - h;
    sh(ctx, T.poly([[x + 22, y], [x + w, y], [x + w, y + h], [x, y + h]]), '#2b2522', 0);
    sh(ctx, T.poly([[x + 6, y + h - 6], [x + 14, y + h - 22], [x + w, y + h - 22], [x + w, y + h - 6]]), '#5a4a40', 0);
    txt(ctx, name, x + w - 18, y + 22, DISPLAY(26), '#fff', 'right');
    txt(ctx, sub, x + w - 18, y + 46, ROUND(14), '#d8cfc4', 'right');
  }

  // ---------- HUD: top-left "now" badge (semi-transparent tile, mini map/icon, title + year) ----------
  // badge(ctx, { label: 'NOW', title: 'DELAWARE R.', year: '1776', icon: (ctx, cx, cy) => {...} }, lt, outLt)
  function badge(ctx, b, lt, o = {}) {
    if (lt <= 0) return;
    const kin = out(lt / .35), kout = o.hold != null && lt > o.hold ? out((lt - o.hold) / .3) : 0; if (kout >= 1) return;
    const x = 14 - (1 - kin) * 210 - kout * 210, y = 14, w = 184, h = 140;
    ctx.save();
    sh(ctx, T.rect(x, y, w, h, 6), 'rgba(70,64,60,.55)', 0);
    txt(ctx, b.label || 'NOW', x + w / 2, y + 14, ROUND(13, 700), 'rgba(255,255,255,.9)');
    if (b.icon) { ctx.save(); b.icon(ctx, x + w / 2, y + 62); ctx.restore(); }
    txt(ctx, b.title, x + w / 2, y + 106, DISPLAY(19), '#fff', 'center', 1, { stroke: 4 });
    if (b.year) txt(ctx, b.year, x + w / 2, y + 127, ROUND(14, 700), '#fff');
    ctx.restore();
  }

  // ---------- HUD: top-right question tracker ----------
  // Cards are stacked by index. segs = [['HOW DOES A ', '#fff'], ['LOSING', RED], [' ARMY WIN?', '#fff']].
  const RED = '#e3262b', GREEN = '#3fae49';
  function qcard(ctx, segs, lt, o = {}) {
    if (lt <= 0) return;
    const ans = o.answer ?? 1e9, gone = o.out ?? 1e9;
    const kin = out(lt / .3), kout = lt > gone ? out((lt - gone) / .35) : 0; if (kout >= 1) return;
    const font = DISPLAY(o.size || 20), tw = segs.reduce((s, [p]) => s + measure(ctx, p, font), 0);
    const h = 44, bw = 44, w = bw + tw + 32, idx = o.index || 0;
    const x = W - 16 - w + (1 - kin) * (w + 30) + kout * (w + 30), y = 14 + idx * (h + 10);
    ctx.save();
    sh(ctx, T.rect(x + 4, y + 5, w, h, 3), 'rgba(0,0,0,.4)', 0);
    sh(ctx, T.rect(x, y, w, h, 3), INK, 0);
    const g = ctx.createLinearGradient(x + bw, 0, x + w, 0); g.addColorStop(0, '#c4422e'); g.addColorStop(1, '#e9874a');
    sh(ctx, T.rect(x + bw + 3, y + 3, w - bw - 6, h - 6, 2), g, 0);
    sh(ctx, T.rect(x + 3, y + 3, bw - 6, h - 6, 2), '#f4f1ea', 0);
    const done = lt >= ans, flip = done ? popK(lt - ans, .3) : 1, cx = x + bw / 2, cy = y + h / 2;
    ctx.save(); ctx.translate(cx, cy); ctx.scale(flip, flip);
    if (!done) { T.line(ctx, [[-11, -11], [11, 11]], 6, RED); T.line(ctx, [[11, -11], [-11, 11]], 6, RED); }
    else { T.line(ctx, [[-12, 0], [-3, 10], [13, -12]], 7, GREEN); }
    ctx.restore();
    rich(ctx, segs, x + bw + 14, y + h / 2 + 2, font, 1, { stroke: 4 });
    ctx.restore();
  }

  // ---------- hanging wooden counter sign ----------
  // sign(ctx, x, y, ['ENLISTMENTS', 'END IN:'], '6', lt, { unit: 'DAYS', flips: [[t, '5'], ...] })
  function sign(ctx, cx, topY, lines, num, lt, o = {}) {
    if (lt <= 0) return;
    const drop = out(lt / .45), y0 = lerp(-260, topY, drop);
    const sw = lt > .3 ? Math.exp(-(lt - .3) * 2.2) * Math.sin((lt - .3) * 7) * .09 : 0;   // damped swing after the drop
    let n = num, flipK = 1;
    for (const [ft, v] of o.flips || []) if (lt >= ft) { n = v; flipK = clamp((lt - ft) / .22); }
    const w = o.w || 380, h = o.h || 150;
    ctx.save(); ctx.translate(cx, y0 - 120); ctx.rotate(sw); ctx.translate(-cx, -(y0 - 120));
    for (const dx of [-w * .36, w * .36]) { T.line(ctx, [[cx + dx, y0 - 400], [cx + dx, y0 + 8]], 5, '#8a6a43'); T.line(ctx, [[cx + dx, y0 - 400], [cx + dx, y0 + 8]], 2, '#c49a62'); }
    const x = cx - w / 2, y = y0;
    sh(ctx, T.rect(x + 6, y + 8, w, h, 10), 'rgba(0,0,0,.35)', 0);
    for (let i = 0; i < 3; i++) sh(ctx, T.rect(x + (i % 2 ? 6 : 0), y + i * h / 3, w - 6, h / 3 + 1, 8), ['#8b5a33', '#7c4f2c', '#875733'][i], 4.5);
    for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++) T.line(ctx, [[x + 30 + k * 110, y + 14 + i * h / 3], [x + 90 + k * 110, y + 16 + i * h / 3]], 2, 'rgba(40,20,10,.35)');
    for (const dx of [-w * .36, w * .36]) { sh(ctx, T.circle(cx + dx, y + 10, 7), '#d9c39a', 3); }
    lines.forEach((l, i) => txt(ctx, l, x + 26, y + 32 + i * 34, MARKER(28), '#1b120c', 'left', 1, { rot: -.02 }));
    const bx = x + w - 112, by = y + 24, bw = 86, bh = h - 46;
    ctx.save(); ctx.translate(bx + bw / 2, by); ctx.scale(1, lerp(.1, 1, flipK)); ctx.rotate(.05);
    sh(ctx, T.rect(-bw / 2, 0, bw, bh, 4), '#f5f0e2', 4.5);
    txt(ctx, n, 0, bh / 2 - (o.unit ? 8 : 0), MARKER(56), '#1b120c');
    if (o.unit) txt(ctx, o.unit, 0, bh - 16, MARKER(16), '#1b120c');
    ctx.restore();
    ctx.restore();
  }

  // ---------- stamps, marker labels, arrows ----------
  function stamp(ctx, s, x, y, lt, o = {}) {
    if (lt <= 0) return;
    const k = lt < .14 ? lerp(2.4, .92, lt / .14) : lerp(.92, 1, clamp((lt - .14) / .1)), a = clamp(lt / .08);
    const px = o.size || 46, color = o.color || RED, w = measure(ctx, s, DISPLAY(px)) + 34, h = px + 22;
    ctx.save(); ctx.globalAlpha *= a * (o.alpha ?? .92); ctx.translate(x, y); ctx.rotate(o.rot ?? -.12); ctx.scale(k, k);
    ctx.lineWidth = 6; ctx.strokeStyle = color; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 8); ctx.stroke();
    ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 5); ctx.stroke();
    txt(ctx, s, 0, 3, DISPLAY(px), color);
    ctx.restore();
  }
  function label(ctx, s, x, y, lt, o = {}) {
    if (lt <= 0) return;
    const k = popK(lt, .25);
    txt(ctx, s, x, y, MARKER(o.size || 30), o.color || '#1b120c', o.align || 'center', clamp(lt / .1), { rot: o.rot ?? -.04, scale: k, stroke: o.stroke, strokeColor: o.strokeColor });
  }
  // Hand-drawn curved arrow that draws itself on (from → to, bend = perpendicular bulge in px).
  function arrow(ctx, from, to, lt, o = {}) {
    if (lt <= 0) return;
    const k = out(lt / (o.d || .35)), bend = o.bend ?? 30, color = o.color || '#1b120c', lw = o.lw || 4;
    const mx = (from[0] + to[0]) / 2, my = (from[1] + to[1]) / 2, dx = to[0] - from[0], dy = to[1] - from[1], L = Math.hypot(dx, dy) || 1;
    const c = [mx - dy / L * bend, my + dx / L * bend], N = 24, pts = [];
    for (let i = 0; i <= N * k; i++) { const u = i / N; pts.push([(1 - u) * (1 - u) * from[0] + 2 * (1 - u) * u * c[0] + u * u * to[0], (1 - u) * (1 - u) * from[1] + 2 * (1 - u) * u * c[1] + u * u * to[1]]); }
    if (pts.length < 2) return;
    if (o.halo) T.line(ctx, pts, lw + 5, o.halo);
    T.line(ctx, pts, lw, color);
    if (k > .95) {
      const p = pts[pts.length - 1], q = pts[pts.length - 3] || pts[0], ang = Math.atan2(p[1] - q[1], p[0] - q[0]);
      const hd = (a2) => [p[0] - Math.cos(ang + a2) * 16, p[1] - Math.sin(ang + a2) * 16];
      if (o.halo) T.line(ctx, [hd(.5), p, hd(-.5)], lw + 5, o.halo);
      T.line(ctx, [hd(.5), p, hd(-.5)], lw, color);
    }
  }

  // ---------- paper card for a real painting / photo (soft paper edge, slight tilt, drop shadow) ----------
  function photoCard(ctx, img, x, y, w, lt, o = {}) {
    if (!img || lt <= 0) return;
    const k = popK(lt, .35), h = w * img.height / img.width, rot = o.rot ?? -.03;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
    ctx.save(); ctx.filter = 'blur(6px)'; ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-w / 2 + 8, -h / 2 + 12, w + 16, h + 16); ctx.restore();
    sh(ctx, T.rect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20, 3), o.paper || '#f3ead6', 3);
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(40,25,10,.5)'; ctx.strokeRect(-w / 2, -h / 2, w, h);
    if (o.caption) txt(ctx, o.caption, 0, h / 2 + 26, ROUND(15, 600), '#3a2c20');
    ctx.restore();
  }

  // ---------- desk calendar (page flips) ----------
  // calendar(ctx, x, y, s, pages=[['DEC','26','1776'], ...], lt, flipTimes=[t1, t2, ...])
  function calendar(ctx, x, y, s, pages, lt, flips) {
    let i = 0; for (const ft of flips) if (lt >= ft) i++;
    i = Math.min(i, pages.length - 1);
    const lastFlip = i > 0 ? flips[i - 1] : -1, fk = clamp((lt - lastFlip) / .18);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    sh(ctx, T.rect(-90, -100, 180, 210, 10), '#e7e1d3', 5);
    const pg = pages[i];
    sh(ctx, T.rect(-90, -100, 180, 54, 10), pg[3] || '#c0392b', 5);
    txt(ctx, pg[0], 0, -72, DISPLAY(32), '#fff');
    txt(ctx, pg[1], 0, 10, DISPLAY(92), INK);
    txt(ctx, pg[2], 0, 82, ROUND(22, 700), '#5a4c3e');
    for (const dx of [-50, 50]) sh(ctx, T.rect(dx - 6, -114, 12, 30, 5), '#8d8d8d', 3);
    if (fk < 1 && i > 0) {                                                // the previous page tearing up and away
      const prev = pages[i - 1]; ctx.save(); ctx.translate(0, -100 - fk * 120); ctx.rotate(-fk * .6); ctx.globalAlpha = 1 - fk;
      sh(ctx, T.rect(-90, 0, 180, 210, 6), '#f5f1e6', 4); txt(ctx, prev[1], 0, 110, DISPLAY(92), INK); ctx.restore();
    }
    ctx.restore();
  }

  // ---------- sunburst (big reveals) ----------
  function sunburst(ctx, t, c1 = '#f6b33c', c2 = '#f08a3c', cx = W / 2, cy = H / 2) {
    ctx.fillStyle = c2; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * .15); ctx.fillStyle = c1;
    for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 1600, i * Math.PI / 8, i * Math.PI / 8 + Math.PI / 16); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 700); g.addColorStop(0, 'rgba(255,240,200,.65)'); g.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }

  // flash/whip transition helper: white flash at the start of a shot
  function flashIn(ctx, lt, d = .18, color = '#fff') { if (lt < d) T.fill(ctx, color, 1 - lt / d); }
  function fadeIn(ctx, lt, d = .3, color = '#000') { if (lt < d) T.fill(ctx, color, 1 - lt / d); }
  function fadeOut(ctx, lt, dur, d = .3, color = '#000') { if (lt > dur - d) T.fill(ctx, color, (lt - (dur - d)) / d); }

  G.Kit = { INK, RED, GREEN, W, H, clamp, lerp, out, inout, back, popK, DISPLAY, MARKER, ROUND, sh, txt, title, rich, measure,
    dateTag, lowerThird, badge, qcard, sign, stamp, label, arrow, photoCard, calendar, sunburst, flashIn, fadeIn, fadeOut };
})(window);
