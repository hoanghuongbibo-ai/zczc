/* Pompeii series cast: round-head cartoon people in the style of the user's references —
 * big round white heads with a grey shading crescent, small dot eyes, short thick brows, small tunic bodies,
 * thin white limbs with round mitten hands, sandals. All original designs.
 *
 * Folk.person(ctx, x, y, s, o) — feet at (x, y). s = 1 → ~190 px tall (head r 42).
 * o = {
 *   dir: -1 | 0 | 1 (facing; features shift that way), body: 'tunic'|'toga'|'armor'|'dress'|'robe'|'coat18'|'modern'|'suit'|'lab'|'flight'|'vest',
 *   col: main cloth colour, col2: trim / second colour, belt, cloak: colour, legs: colour (default skin white), shoes,
 *   hair: 'short'|'curly'|'bald'|'long'|'bun'|'messy'|'wig'|'none', hairCol, hat: 'legion'|'gallic'|'wreath'|'pileus'|'band'|'hard'|'tricorn'|
 *   'crown'|'pillow'|'veil'|'sun'|'cap'|'pilot'|'kerchief'|'none', hatCol, beard: 'stubble'|'full'|'mustache'|'goatee', chin (Sulla), glasses,
 *   face: { eyes: 'dot'|'wide'|'closed'|'happy'|'half'|'side'|'sad', look: [x, y], brows: 'calm'|'up'|'angry'|'worried'|'sad'|'skeptic'|'none',
 *           mouth: 'flat'|'smile'|'grin'|'open'|'o'|'frown'|'wavy'|'smirk'|'teeth'|'sad', talk: 0..1, sweat, blush, tear },
 *   armL / armR: [dx, dy] hand target from the shoulder (figure units, +x = screen right before mirroring), or 'crossed' via o.arms,
 *   holdL / holdR: fn(ctx, hx, hy) drawn at the hand, walk: phase (rad), sit: true, lean, bob, squash, alpha
 * } */
(function (G) {
  'use strict';
  const INK = '#2b2420', LW = 3.2, SKIN = '#ffffff', SHADE = '#e2e2e6';
  const HEADR = 42, HEADY = -146, SHY = -104, HIPY = -44;

  function P(ctx, fill, lw, path) {
    ctx.beginPath(); path(ctx);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); }
  }
  function L(ctx, pts, w = LW, c = INK) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
  function Q(ctx, a, c, b, w = LW, col = INK) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(c[0], c[1], b[0], b[1]); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); }
  const shade = (hex, k) => { if (!hex || hex[0] !== '#') return hex; const p = [1, 3, 5].map(i => parseInt(hex.substr(i, 2), 16)); return `rgb(${p.map(v => Math.round(Math.max(0, Math.min(255, v * k)))).join(',')})`; };

  // ---------------- head ----------------
  function headBack(ctx, o, r, d) {
    const hc = o.hairCol || '#5a3a24';
    if (o.hair === 'long') P(ctx, hc, LW, c => { c.moveTo(-r * 1.0, -r * .1); c.quadraticCurveTo(-r * 1.2, r * 1.0, -r * .8, r * 1.35); c.lineTo(r * .8, r * 1.35); c.quadraticCurveTo(r * 1.2, r * 1.0, r * 1.0, -r * .1); c.closePath(); });
    if (o.hair === 'bun') P(ctx, hc, LW, c => c.arc(-d * r * .55, -r * .78, r * .34, 0, 7));
    if (o.hair === 'wig') { P(ctx, '#f1efe9', LW, c => { c.moveTo(-r * 1.1, r * .4); c.quadraticCurveTo(-r * 1.25, -r * 1.25, 0, -r * 1.15); c.quadraticCurveTo(r * 1.25, -r * 1.25, r * 1.1, r * .4); c.closePath(); }); P(ctx, '#2b2420', 0, c => c.rect(-d * r * .95 - 4, r * .3, 8, r * .9)); }
    if (o.hat === 'veil') P(ctx, o.hatCol || '#d9c7a3', LW, c => { c.moveTo(-r * 1.15, r * .1); c.quadraticCurveTo(-r * 1.3, -r * 1.3, 0, -r * 1.22); c.quadraticCurveTo(r * 1.3, -r * 1.3, r * 1.15, r * .1); c.quadraticCurveTo(r * 1.3, r * 1.2, r * .9, r * 1.6); c.lineTo(-r * .9, r * 1.6); c.quadraticCurveTo(-r * 1.3, r * 1.2, -r * 1.15, r * .1); c.closePath(); });
  }
  function head(ctx, o, r, t) {
    const f = o.face || {}, d = o.dir || 0, fx = d * r * .2, hc = o.hairCol || '#5a3a24';
    headBack(ctx, o, r, d);
    // chin (Sulla's enormous one) sits under the face disc
    if (o.chin) P(ctx, SKIN, LW, c => { c.moveTo(-r * .62 + fx, r * .55); c.quadraticCurveTo(-r * .75 + fx, r * (1.45 + o.chin * .35), fx + d * r * .2, r * (1.5 + o.chin * .35)); c.quadraticCurveTo(r * .75 + fx, r * (1.45 + o.chin * .35), r * .62 + fx, r * .55); c.closePath(); });
    P(ctx, SKIN, LW, c => c.arc(0, 0, r, 0, Math.PI * 2));
    // shading crescent (light from upper left)
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r - 1.5, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = SHADE; ctx.beginPath(); ctx.arc(0, 0, r, -Math.PI * .45, Math.PI * .75); ctx.arc(-r * .3, -r * .12, r * 1.02, Math.PI * .75, -Math.PI * .45, true); ctx.fill(); ctx.restore();
    if (o.chin) { ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r - 2, 0.15, Math.PI - .15); ctx.strokeStyle = SKIN; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    P(ctx, null, LW, c => c.arc(0, 0, r, o.chin ? Math.PI * .95 : 0, o.chin ? Math.PI * 2.05 : Math.PI * 2));
    // hair / caps on top of the head
    hair(ctx, o, r, d, hc);
    // face
    const lk = f.look || [d * .5, 0], ex = r * .3, ey = r * .12 + lk[1] * r * .07, eyes = f.eyes || 'dot';
    for (const s of [-1, 1]) {
      const x = fx + s * ex * (1 - Math.abs(d) * .12) + lk[0] * r * .1;
      if (eyes === 'wide') { P(ctx, '#fff', 2.4, c => c.ellipse(x, ey - r * .02, r * .15, r * .17, 0, 0, 7)); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x + lk[0] * r * .06, ey + lk[1] * r * .05, r * .055, 0, 7); ctx.fill(); }
      else if (eyes === 'closed') Q(ctx, [x - r * .09, ey], [x, ey + r * .06], [x + r * .09, ey], 3);
      else if (eyes === 'happy') Q(ctx, [x - r * .09, ey + r * .03], [x, ey - r * .08], [x + r * .09, ey + r * .03], 3);
      else if (eyes === 'sad') { ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(x, ey + r * .02, r * .05, r * .06, 0, 0, 7); ctx.fill(); }
      else { ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(x, ey, r * .058, r * .078, 0, 0, 7); ctx.fill(); if (eyes === 'half') L(ctx, [[x - r * .1, ey - r * .03], [x + r * .1, ey - r * .03]], 2.6); }
      if (eyes === 'half') { ctx.fillStyle = SKIN; ctx.fillRect(x - r * .09, ey - r * .1, r * .18, r * .065); L(ctx, [[x - r * .1, ey - r * .035], [x + r * .1, ey - r * .035]], 2.6); }
      // brows: inner end moves with the expression
      const br = f.brows || 'calm';
      if (br !== 'none') {
        const by = ey - r * .26 + (eyes === 'wide' ? -r * .06 : 0), up = br === 'up' ? -r * .1 : 0;
        const inner = br === 'angry' ? r * .08 : br === 'worried' || br === 'sad' ? -r * .07 : br === 'skeptic' && s > 0 ? -r * .1 : 0;
        L(ctx, [[x - s * r * .12, by + up + inner], [x + s * r * .1, by + up - inner * .3]], 4.2);
      }
      if (f.tear && s < 0) { ctx.fillStyle = '#8cc4e6'; ctx.beginPath(); ctx.ellipse(x, ey + r * .2 + (f.tear % 1) * r * .25, r * .04, r * .065, 0, 0, 7); ctx.fill(); }
    }
    if (o.glasses) for (const s of [-1, 1]) { const x = fx + s * ex + lk[0] * r * .1; ctx.lineWidth = 2.4; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(x, ey, r * .15, 0, 7); ctx.stroke(); if (s < 0) L(ctx, [[x + r * .15, ey], [x + ex * 2 - r * .15, ey]], 2.2); }
    if (f.blush) { ctx.fillStyle = 'rgba(235,120,110,.35)'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(fx + s * r * .5, ey + r * .24, r * .12, r * .06, 0, 0, 7); ctx.fill(); } }
    // beard / stubble / mustache
    const my = r * .52 + (o.chin ? r * .25 : 0), mx = fx + lk[0] * r * .06;
    if (o.beard === 'full') P(ctx, hc, LW, c => { c.moveTo(-r * .78 + fx * .5, r * .2); c.quadraticCurveTo(-r * .7, r * 1.15, mx, r * 1.12); c.quadraticCurveTo(r * .7, r * 1.15, r * .78 + fx * .5, r * .2); c.quadraticCurveTo(r * .5, r * .55, mx, r * .42); c.quadraticCurveTo(-r * .5, r * .55, -r * .78 + fx * .5, r * .2); c.closePath(); });
    if (o.beard === 'stubble') { ctx.fillStyle = 'rgba(80,70,64,.55)'; const pts = [[-.42, .55], [-.3, .66], [-.15, .72], [0, .74], [.15, .72], [.3, .66], [.42, .55], [-.36, .45], [.36, .45], [-.2, .6], [.2, .6]]; for (const [a, b] of pts) { ctx.beginPath(); ctx.arc(fx + a * r, b * r + (o.chin ? r * .3 : 0), 1.6, 0, 7); ctx.fill(); } }
    if (o.beard === 'goatee') P(ctx, hc, 2.4, c => { c.moveTo(mx - r * .14, r * .72); c.quadraticCurveTo(mx, r * 1.02, mx + r * .14, r * .72); c.closePath(); });
    // mouth
    const m = f.mouth || 'flat', talk = Math.max(0, Math.min(1, f.talk || 0));
    if (talk > .08 || m === 'open') {
      const h = r * (m === 'open' ? .16 : .04 + .16 * talk), w = r * (m === 'grin' ? .2 : .13);
      P(ctx, '#6b2e2a', 2.4, c => { c.moveTo(mx - w, my - h * .25); c.quadraticCurveTo(mx, my - h * .6, mx + w, my - h * .25); c.quadraticCurveTo(mx + w * .9, my + h, mx, my + h); c.quadraticCurveTo(mx - w * .9, my + h, mx - w, my - h * .25); c.closePath(); });
      if (h > r * .09) { ctx.fillStyle = '#e8837a'; ctx.beginPath(); ctx.ellipse(mx, my + h * .6, w * .5, h * .28, 0, 0, 7); ctx.fill(); }
    } else if (m === 'smile') Q(ctx, [mx - r * .15, my - r * .03], [mx, my + r * .13], [mx + r * .15, my - r * .03], 3.2);
    else if (m === 'grin') { P(ctx, '#fff', 2.6, c => { c.moveTo(mx - r * .2, my - r * .05); c.quadraticCurveTo(mx, my + r * .26, mx + r * .2, my - r * .05); c.closePath(); }); L(ctx, [[mx - r * .17, my + r * .02], [mx + r * .17, my + r * .02]], 1.6); }
    else if (m === 'frown' || m === 'sad') Q(ctx, [mx - r * .13, my + r * .07], [mx, my - r * .07], [mx + r * .13, my + r * .07], 3.2);
    else if (m === 'o') P(ctx, '#6b2e2a', 2.4, c => c.ellipse(mx, my + r * .02, r * .07, r * .09, 0, 0, 7));
    else if (m === 'wavy') L(ctx, [[mx - r * .14, my], [mx - r * .07, my - r * .04], [mx, my + r * .02], [mx + r * .07, my - r * .04], [mx + r * .14, my]], 2.8);
    else if (m === 'smirk') Q(ctx, [mx - r * .12, my + r * .02], [mx + r * .05, my + r * .06], [mx + r * .15, my - r * .06], 3.2);
    else if (m === 'teeth') { P(ctx, '#fff', 2.4, c => c.roundRect(mx - r * .17, my - r * .05, r * .34, r * .12, 4)); L(ctx, [[mx - r * .17, my + r * .01], [mx + r * .17, my + r * .01]], 1.4); }
    else L(ctx, [[mx - r * .1, my], [mx + r * .1, my]], 3.2);
    if (o.beard === 'mustache') P(ctx, hc, 2.2, c => { c.moveTo(mx, my - r * .12); c.quadraticCurveTo(mx - r * .2, my - r * .2, mx - r * .3, my - r * .02); c.quadraticCurveTo(mx - r * .15, my - r * .08, mx, my - r * .06); c.quadraticCurveTo(mx + r * .15, my - r * .08, mx + r * .3, my - r * .02); c.quadraticCurveTo(mx + r * .2, my - r * .2, mx, my - r * .12); c.closePath(); });
    if (f.sweat) { const k = f.sweat % 1; ctx.fillStyle = '#8cc4e6'; P(ctx, '#bfe3f7', 2, c => { const x = r * .78, y = -r * .35 + k * r * .3; c.moveTo(x, y - r * .14); c.quadraticCurveTo(x + r * .1, y + r * .02, x, y + r * .06); c.quadraticCurveTo(x - r * .1, y + r * .02, x, y - r * .14); }); }
  }
  function hair(ctx, o, r, d, hc) {
    const hs = o.hair || 'short';
    if (hs === 'short' || hs === 'long' || hs === 'bun' || hs === 'messy') P(ctx, hc, LW, c => {
      c.moveTo(-r * 1.0, -r * .05); c.quadraticCurveTo(-r * 1.08, -r * 1.12, d * r * .1, -r * 1.06); c.quadraticCurveTo(r * 1.08, -r * 1.12, r * 1.0, -r * .05);
      c.quadraticCurveTo(r * .85, -r * .5, r * .45 + d * r * .2, -r * .55); c.lineTo(r * .25 + d * r * .2, -r * .38); c.lineTo(d * r * .2, -r * .6);
      c.quadraticCurveTo(-r * .6, -r * .55, -r * 1.0, -r * .05); c.closePath(); });
    if (hs === 'messy') for (let i = 0; i < 5; i++) { const a = -2.6 + i * .32; L(ctx, [[Math.cos(a) * r * 1.0, Math.sin(a) * r * 1.0], [Math.cos(a) * r * 1.25, Math.sin(a) * r * 1.22]], 3.4, hc); }
    if (hs === 'curly') for (let i = 0; i < 9; i++) { const a = Math.PI * (1.02 + i * .12); P(ctx, hc, 2.4, c => c.arc(Math.cos(a) * r * .9, Math.sin(a) * r * .9, r * .24, 0, 7)); }
    if (hs === 'bald') { P(ctx, o.hairCol || '#b9b3aa', 2.4, c => c.ellipse(-r * .95, r * .05, r * .16, r * .3, 0, 0, 7)); P(ctx, o.hairCol || '#b9b3aa', 2.4, c => c.ellipse(r * .95, r * .05, r * .16, r * .3, 0, 0, 7)); }
    if (hs === 'wig') { P(ctx, '#f1efe9', LW, c => { c.moveTo(-r * 1.0, -r * .1); c.quadraticCurveTo(-r * 1.05, -r * 1.12, 0, -r * 1.08); c.quadraticCurveTo(r * 1.05, -r * 1.12, r * 1.0, -r * .1); c.quadraticCurveTo(r * .6, -r * .65, 0, -r * .62); c.quadraticCurveTo(-r * .6, -r * .65, -r * 1.0, -r * .1); }); for (const s of [-1, 1]) for (const yy of [-.1, .2]) P(ctx, '#f1efe9', 2.4, c => c.ellipse(s * r * 1.0, yy * r, r * .2, r * .13, 0, 0, 7)); }
    const hat = o.hat, hcol = o.hatCol;
    if (hat === 'legion' || hat === 'gallic') {
      const gold = hcol || '#d9a441';
      P(ctx, gold, LW, c => { c.moveTo(-r * 1.08, -r * .12); c.quadraticCurveTo(-r * 1.1, -r * 1.2, 0, -r * 1.18); c.quadraticCurveTo(r * 1.1, -r * 1.2, r * 1.08, -r * .12); c.lineTo(r * 1.18, -r * .02); c.lineTo(-r * 1.18, -r * .02); c.closePath(); });
      L(ctx, [[-r * 1.0, -r * .3], [r * 1.0, -r * .3]], 2, shade(gold, .7));
      for (const s of [-1, 1]) if (s !== -Math.sign(d) || d === 0) P(ctx, gold, 2.6, c => c.roundRect(s * r * .98 - r * .16, -r * .1, r * .32, r * .62, 6));
      if (hat === 'legion') P(ctx, o.crest || '#c8372d', LW, c => { c.moveTo(-r * .55, -r * 1.08); c.quadraticCurveTo(0, -r * 1.75, r * .55, -r * 1.08); c.quadraticCurveTo(0, -r * 1.3, -r * .55, -r * 1.08); c.closePath(); });
      else { for (const [a, l] of [[-.25, 1.0], [0, 1.1], [.25, 1.0]]) P(ctx, '#f4efe4', 2.2, c => { c.ellipse(Math.sin(a) * r * .5 - r * .2, -r * 1.2 - l * r * .4, r * .1, r * .42 * l, a, 0, 7); }); }
    }
    if (hat === 'wreath') for (let i = 0; i < 9; i++) { const a = Math.PI * (1.08 + i * .105); P(ctx, '#6f9a3b', 2, c => c.ellipse(Math.cos(a) * r * .98, Math.sin(a) * r * .98, r * .17, r * .08, a + 1.2, 0, 7)); }
    if (hat === 'pileus') P(ctx, hcol || '#b98a5a', LW, c => { c.moveTo(-r * .95, -r * .35); c.quadraticCurveTo(-r * .7, -r * 1.45, 0, -r * 1.42); c.quadraticCurveTo(r * .7, -r * 1.45, r * .95, -r * .35); c.closePath(); });
    if (hat === 'band') { P(ctx, hcol || '#c45a3c', 2.6, c => c.rect(-r * 1.0, -r * .58, r * 2.0, r * .2)); P(ctx, hcol || '#c45a3c', 2.6, c => { c.moveTo(-d * r * 1.0, -r * .45); c.lineTo(-d * r * 1.35, -r * .2); c.lineTo(-d * r * 1.25, -r * .55); c.closePath(); }); }
    if (hat === 'hard') { P(ctx, hcol || '#f2c230', LW, c => { c.moveTo(-r * .98, -r * .4); c.quadraticCurveTo(-r * .95, -r * 1.25, 0, -r * 1.22); c.quadraticCurveTo(r * .95, -r * 1.25, r * .98, -r * .4); c.closePath(); }); P(ctx, hcol || '#f2c230', LW, c => c.roundRect(-r * 1.15, -r * .48, r * 2.3, r * .14, 4)); L(ctx, [[0, -r * 1.2], [0, -r * .5]], 2.2, shade(hcol || '#f2c230', .75)); }
    if (hat === 'tricorn') P(ctx, hcol || '#2d2a33', LW, c => { c.moveTo(-r * 1.3, -r * .55); c.quadraticCurveTo(-r * .9, -r * 1.55, 0, -r * 1.3); c.quadraticCurveTo(r * .9, -r * 1.55, r * 1.3, -r * .55); c.quadraticCurveTo(0, -r * .9, -r * 1.3, -r * .55); c.closePath(); });
    if (hat === 'crown') { P(ctx, '#f0c43c', LW, c => { c.moveTo(-r * .7, -r * .78); c.lineTo(-r * .75, -r * 1.35); c.lineTo(-r * .4, -r * 1.08); c.lineTo(0, -r * 1.45); c.lineTo(r * .4, -r * 1.08); c.lineTo(r * .75, -r * 1.35); c.lineTo(r * .7, -r * .78); c.closePath(); }); for (const x of [-.4, 0, .4]) P(ctx, '#d2384a', 1.6, c => c.arc(x * r, -r * .92, r * .07, 0, 7)); }
    if (hat === 'pillow') { P(ctx, hcol || '#f3ead8', LW, c => c.roundRect(-r * 1.15, -r * 1.55, r * 2.3, r * .85, r * .35)); L(ctx, [[-r * .6, -r * .8], [-r * .95, r * .2]], 3.2, '#8a5a3a'); L(ctx, [[r * .6, -r * .8], [r * .95, r * .2]], 3.2, '#8a5a3a'); for (const x of [-.6, .6]) P(ctx, null, 1.6, c => c.arc(x * r * 1.6, -r * 1.12, 2, 0, 7)); }
    if (hat === 'veil') P(ctx, hcol || '#d9c7a3', LW, c => { c.moveTo(-r * 1.08, r * .25); c.quadraticCurveTo(-r * 1.2, -r * 1.22, 0, -r * 1.16); c.quadraticCurveTo(r * 1.2, -r * 1.22, r * 1.08, r * .25); c.quadraticCurveTo(r * .82, -r * .6, 0, -r * .7); c.quadraticCurveTo(-r * .82, -r * .6, -r * 1.08, r * .25); c.closePath(); });
    if (hat === 'sun') { P(ctx, hcol || '#e7d29a', LW, c => c.ellipse(0, -r * .62, r * 1.5, r * .26, 0, 0, 7)); P(ctx, hcol || '#e7d29a', LW, c => { c.moveTo(-r * .72, -r * .65); c.quadraticCurveTo(-r * .7, -r * 1.35, 0, -r * 1.3); c.quadraticCurveTo(r * .7, -r * 1.35, r * .72, -r * .65); c.closePath(); }); L(ctx, [[-r * .72, -r * .78], [r * .72, -r * .78]], 4, '#a5553a'); }
    if (hat === 'cap') { P(ctx, hcol || '#3b6fb6', LW, c => { c.moveTo(-r * .97, -r * .38); c.quadraticCurveTo(-r * .9, -r * 1.22, 0, -r * 1.18); c.quadraticCurveTo(r * .9, -r * 1.22, r * .97, -r * .38); c.closePath(); }); P(ctx, hcol || '#3b6fb6', LW, c => c.ellipse((d || 1) * r * .85, -r * .42, r * .55, r * .12, 0, 0, 7)); }
    if (hat === 'pilot') { P(ctx, hcol || '#6b4a32', LW, c => { c.moveTo(-r * 1.02, r * .2); c.quadraticCurveTo(-r * 1.1, -r * 1.2, 0, -r * 1.15); c.quadraticCurveTo(r * 1.1, -r * 1.2, r * 1.02, r * .2); c.quadraticCurveTo(r * .8, -r * .45, 0, -r * .5); c.quadraticCurveTo(-r * .8, -r * .45, -r * 1.02, r * .2); c.closePath(); }); for (const s of [-1, 1]) P(ctx, '#9fc6d8', 2.4, c => c.arc(s * r * .32, -r * .72, r * .2, 0, 7)); }
    if (hat === 'kerchief') P(ctx, hcol || '#c0563c', LW, c => { c.moveTo(-r * 1.02, -r * .2); c.quadraticCurveTo(-r * 1.05, -r * 1.15, 0, -r * 1.1); c.quadraticCurveTo(r * 1.05, -r * 1.15, r * 1.02, -r * .2); c.quadraticCurveTo(0, -r * .55, -r * 1.02, -r * .2); c.closePath(); });
  }

  // ---------------- limbs ----------------
  function ik(sh, tg, l1, l2, bend) {
    let dx = tg[0] - sh[0], dy = tg[1] - sh[1], dd = Math.hypot(dx, dy); const max = l1 + l2 - .5;
    if (dd > max) { dx *= max / dd; dy *= max / dd; dd = max; }
    const a = Math.atan2(dy, dx), cosB = (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd), b = Math.acos(Math.max(-1, Math.min(1, cosB)));
    const el = [sh[0] + Math.cos(a + bend * b) * l1, sh[1] + Math.sin(a + bend * b) * l1];
    return [el, [sh[0] + dx, sh[1] + dy]];
  }
  function limb(ctx, pts, col, w = 8.5) { L(ctx, pts, w + LW * 1.6); L(ctx, pts, w, col); }
  function hand(ctx, x, y, col = SKIN, r = 7) { P(ctx, col, 2.6, c => c.arc(x, y, r, 0, 7)); }

  // ---------------- body ----------------
  function torso(ctx, o, t) {
    const col = o.col || '#b9805a', c2 = o.col2 || shade(col, .75), b = o.body || 'tunic', d = o.dir || 0;
    const hem = { dress: -14, robe: -12, coat18: -34, lab: -30, toga: -30 }[b] ?? -38;
    const sw = 25, hw = b === 'dress' || b === 'robe' ? 34 : 30;
    const path = c => { c.moveTo(-sw, SHY + 6); c.quadraticCurveTo(-sw, SHY - 4, -sw + 10, SHY - 6); c.lineTo(sw - 10, SHY - 6); c.quadraticCurveTo(sw, SHY - 4, sw, SHY + 6); c.lineTo(hw, hem); c.quadraticCurveTo(0, hem + 5, -hw, hem); c.closePath(); };
    if (b === 'armor') {
      P(ctx, o.col2 || '#c7473a', LW, c => { c.moveTo(-26, -70); c.lineTo(26, -70); c.lineTo(30, -40); c.quadraticCurveTo(0, -36, -30, -40); c.closePath(); });
      for (let i = -3; i <= 3; i++) P(ctx, '#8a5a34', 2.2, c => c.roundRect(i * 8.4 - 3.8, -66, 7.6, 22, 2));
      P(ctx, o.col || '#d9a441', LW, c => { c.moveTo(-sw, SHY + 6); c.quadraticCurveTo(-sw, SHY - 4, -sw + 10, SHY - 6); c.lineTo(sw - 10, SHY - 6); c.quadraticCurveTo(sw, SHY - 4, sw, SHY + 6); c.lineTo(23, -64); c.quadraticCurveTo(0, -58, -23, -64); c.closePath(); });
      Q(ctx, [-12, -92], [-6, -84], [0, -90], 2, shade(o.col || '#d9a441', .7)); Q(ctx, [0, -90], [6, -84], [12, -92], 2, shade(o.col || '#d9a441', .7)); L(ctx, [[0, -88], [0, -72]], 2, shade(o.col || '#d9a441', .7));
      return;
    }
    P(ctx, col, LW, path);
    ctx.save(); ctx.beginPath(); path(ctx); ctx.clip();
    ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(8, SHY - 10, 40, 120);   // soft side shade
    if (b === 'toga') { P(ctx, o.col2 || '#f3efe6', LW, c => { c.moveTo(-sw - 6, SHY - 4); c.lineTo(-6, SHY - 8); c.quadraticCurveTo(22, -70, hw + 4, hem + 4); c.lineTo(-4, hem + 6); c.quadraticCurveTo(-10, -70, -sw - 6, SHY - 4); c.closePath(); }); if (o.stripe) L(ctx, [[-4, SHY - 7], [16, -76], [hw, hem + 2]], 4.5, o.stripe); }
    if (b === 'coat18') { P(ctx, o.col2 || '#e9d9b0', 2.4, c => c.rect(-9, SHY - 4, 18, 60)); for (let i = 0; i < 5; i++) P(ctx, '#e8c45a', 1.4, c => c.arc(-14, SHY + 8 + i * 12, 2.4, 0, 7)); L(ctx, [[-9, SHY - 4], [-12, hem]], 2.4); L(ctx, [[9, SHY - 4], [12, hem]], 2.4); }
    if (b === 'suit' || b === 'lab' || b === 'flight') { P(ctx, o.col2 || '#f4f1ea', 2.4, c => { c.moveTo(-10, SHY - 6); c.lineTo(0, SHY + 18); c.lineTo(10, SHY - 6); c.closePath(); }); if (b === 'suit') P(ctx, o.tie || '#c0453a', 2, c => { c.moveTo(-3, SHY); c.lineTo(3, SHY); c.lineTo(4, SHY + 16); c.lineTo(0, SHY + 20); c.lineTo(-4, SHY + 16); c.closePath(); }); L(ctx, [[0, SHY + 18], [0, hem]], 2.2, 'rgba(0,0,0,.35)'); }
    if (b === 'vest') { P(ctx, '#f2b630', 2.4, c => { c.moveTo(-sw + 2, SHY); c.lineTo(-8, SHY); c.lineTo(-8, hem); c.lineTo(-hw + 2, hem); c.closePath(); }); P(ctx, '#f2b630', 2.4, c => { c.moveTo(sw - 2, SHY); c.lineTo(8, SHY); c.lineTo(8, hem); c.lineTo(hw - 2, hem); c.closePath(); }); L(ctx, [[-hw, -60], [-8, -60]], 4, '#e8e8e8'); L(ctx, [[8, -60], [hw, -60]], 4, '#e8e8e8'); }
    if (b === 'robe' && o.col2) L(ctx, [[0, SHY - 6], [0, hem]], 6, o.col2);
    ctx.restore();
    if (b === 'tunic' || b === 'dress' || b === 'toga') { Q(ctx, [-8, SHY - 6], [0, SHY + 4], [8, SHY - 6], 2.4); }
    if (o.belt !== false && (b === 'tunic' || b === 'robe' || b === 'dress')) P(ctx, o.belt || '#6b4630', 2.4, c => c.rect(-28, -70, 56, 7));
    if (o.belt && b === 'modern') P(ctx, o.belt, 2.4, c => c.rect(-29, -46, 58, 6));
    if (o.medal) P(ctx, '#f0c43c', 2, c => c.arc(-12, SHY + 18, 5, 0, 7));
  }

  function person(ctx, x, y, s = 1, o = {}) {
    const t = o.t || 0, d = o.dir || 0, mir = o.mirror ? -1 : 1;
    ctx.save(); ctx.translate(x, y + (o.bob || 0) * s); ctx.scale(s * mir, s * (o.squash || 1)); if (o.lean) ctx.rotate(o.lean); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    const legCol = o.legs || SKIN, shoes = o.shoes || '#8a5a34', modernLegs = !!o.legs;
    // cloak behind
    if (o.cloak) P(ctx, o.cloak, LW, c => { c.moveTo(-24, SHY - 2); c.quadraticCurveTo(-46 + d * 8, -60, -40 + d * 14 + Math.sin(t * 2) * 2, -18); c.lineTo(36 + d * 14 + Math.sin(t * 2 + 1) * 2, -18); c.quadraticCurveTo(44 + d * 8, -60, 24, SHY - 2); c.closePath(); });
    // legs
    if (o.sit) {
      for (const sx of [-10, 10]) { limb(ctx, [[sx, HIPY], [sx + 34 * (d || 1), HIPY + 2], [sx + 36 * (d || 1), -6]], legCol, modernLegs ? 11 : 8); P(ctx, shoes, 2.4, c => c.ellipse(sx + 40 * (d || 1), -4, 10, 5.5, 0, 0, 7)); }
    } else {
      const ph = o.walk;
      for (const [i, sx] of [[0, -10], [1, 10]]) {
        const sw = ph == null ? 0 : Math.sin(ph + i * Math.PI) * 12, lift = ph == null ? 0 : Math.max(0, Math.cos(ph + i * Math.PI)) * 6;
        const fx = sx + sw + (o.stance || 0) * (i ? 1 : -1), fy = -4 - lift;
        limb(ctx, [[sx, HIPY], [fx, fy]], legCol, modernLegs ? 11 : 8);
        P(ctx, shoes, 2.4, c => c.ellipse(fx + (d || (i ? 1 : -1)) * 4, fy + 1, 10, 5.5, 0, 0, 7));
        if (!modernLegs && !o.boots) L(ctx, [[fx - 4, fy - 10], [fx + 4, fy - 6]], 2, shoes);
      }
    }
    // arms
    const L1 = 30, L2 = 30, armCol = o.sleeve || SKIN;
    const shL = [-21, SHY + 6], shR = [21, SHY + 6];
    const tgL = o.armL || [-5, 58], tgR = o.armR || [5, 58];
    const drawArm = (sh, tg, bend, hold, side) => {
      const [el, wr] = ik(sh, [sh[0] + tg[0], sh[1] + tg[1]], L1, L2, bend);
      limb(ctx, [sh, el, wr], armCol);
      if (o.sleeve == null && (o.body === 'modern' || o.body === 'suit' || o.body === 'lab' || o.body === 'coat18' || o.body === 'flight' || o.body === 'vest' || o.body === 'robe')) limb(ctx, [sh, el, [el[0] + (wr[0] - el[0]) * .6, el[1] + (wr[1] - el[1]) * .6]], o.body === 'vest' ? (o.col || '#6d8bb3') : o.body === 'robe' ? o.col : (o.col || '#6d8bb3'));
      hand(ctx, wr[0], wr[1], o.gloves || SKIN);
      if (hold) { ctx.save(); hold(ctx, wr[0], wr[1], Math.atan2(wr[1] - el[1], wr[0] - el[0])); ctx.restore(); }
    };
    const crossed = o.arms === 'crossed';
    if (!crossed) drawArm(shL, tgL, o.bendL ?? 1, o.holdL, -1);
    torso(ctx, o, t);
    if (crossed) {
      limb(ctx, [shL, [-24, -70], [14, -78]], armCol); limb(ctx, [shR, [24, -70], [-14, -76]], armCol);
      P(ctx, o.col || '#b9805a', 2.4, c => c.roundRect(-26, -84, 52, 14, 7)); hand(ctx, 18, -78); hand(ctx, -18, -76);
    }
    // head
    ctx.save(); ctx.translate((o.headX || 0), HEADY + (o.headY || 0)); ctx.rotate(o.tilt || 0); ctx.scale(o.headScale || 1, o.headScale || 1);
    head(ctx, o, HEADR, t); ctx.restore();
    if (!crossed) drawArm(shR, tgR, o.bendR ?? -1, o.holdR, 1);
    if (o.front) o.front(ctx);
    ctx.restore();
  }

  // ---------------- cached sprites for crowds ----------------
  const SPR = new Map();
  function sprite(o, s = 1) {
    const key = JSON.stringify(o) + '|' + s;
    let c = SPR.get(key);
    if (!c) {
      const SS = (G.PK && G.PK.SS) || 1.5, w = Math.ceil(170 * s * SS), h = Math.ceil(300 * s * SS);
      c = document.createElement('canvas'); c.width = w; c.height = h;
      const g = c.getContext('2d'); g.scale(SS, SS); person(g, 85 * s, 280 * s, s, o);
      c._ax = 85 * s; c._ay = 280 * s; c._w = 170 * s; c._h = 300 * s; SPR.set(key, c);
    }
    return c;
  }
  function stamp(ctx, o, x, y, s = 1, mirror = false) {
    const c = sprite(o, s);
    if (mirror) { ctx.save(); ctx.translate(x, y); ctx.scale(-1, 1); ctx.drawImage(c, -c._ax, -c._ay, c._w, c._h); ctx.restore(); }
    else ctx.drawImage(c, x - c._ax, y - c._ay, c._w, c._h);
  }

  // ---------------- extras generator ----------------
  const TUNICS = ['#c9894f', '#7f9f5a', '#5f8fb8', '#b65a4a', '#d8b56a', '#8b6fa8', '#a0a29a', '#6aa39a', '#c27a94'];
  const HAIRC = ['#5a3a24', '#2f241e', '#8a5a34', '#3d2f28', '#b07a46'];
  function roman(seed, extra = {}) {
    let s = (seed * 9301 + 49297) % 233280; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const female = r() < .4;
    const o = { body: female ? 'dress' : 'tunic', col: TUNICS[Math.floor(r() * TUNICS.length)], hair: female ? (r() < .5 ? 'bun' : 'long') : ['short', 'curly', 'bald', 'short', 'messy'][Math.floor(r() * 5)],
      hairCol: HAIRC[Math.floor(r() * HAIRC.length)], beard: !female && r() < .35 ? ['stubble', 'full', 'mustache'][Math.floor(r() * 3)] : undefined,
      hat: female && r() < .3 ? 'veil' : (!female && r() < .12 ? 'pileus' : undefined), face: { eyes: 'dot', brows: 'calm', mouth: ['flat', 'smile', 'smile', 'o'][Math.floor(r() * 4)] } };
    if (o.hat === 'veil') o.hatCol = ['#d9c7a3', '#c9a0a0', '#a8b9c9'][Math.floor(r() * 3)];
    return Object.assign(o, extra);
  }

  // ---------------- named cast ----------------
  const CAST = {
    worker: { body: 'tunic', col: '#b98652', belt: '#5d3d27', hair: 'messy', hairCol: '#4a3426', beard: 'stubble', hat: 'band', hatCol: '#c4573a', face: { eyes: 'half', brows: 'calm', mouth: 'flat' } },
    pompeian: { body: 'tunic', col: '#6f9bc4', hair: 'curly', hairCol: '#3a2a20', face: { eyes: 'dot', brows: 'calm', mouth: 'smile' } },
    sulla: { body: 'armor', col: '#d9a441', col2: '#a8322b', cloak: '#b8322b', hair: 'short', hairCol: '#c9c1b2', chin: 1, hat: 'wreath', face: { eyes: 'dot', brows: 'angry', mouth: 'flat' } },
    vet: { body: 'armor', col: '#b8a07a', col2: '#9a4a3a', hat: 'legion', hatCol: '#c99a45', crest: '#a8322b', beard: 'full', hairCol: '#b9b3aa', face: { eyes: 'dot', brows: 'calm', mouth: 'smile' } },
    legion: { body: 'armor', col: '#c9a45a', col2: '#b8423a', hat: 'legion', hatCol: '#d9a441', face: { eyes: 'dot', brows: 'angry', mouth: 'flat' } },
    senator: { body: 'toga', col: '#f0ebe0', col2: '#f6f2ea', stripe: '#7a3b8f', hair: 'bald', face: { eyes: 'dot', brows: 'calm', mouth: 'flat' } },
    seneca: { body: 'toga', col: '#e9e2d4', col2: '#f6f2ea', hair: 'bald', hairCol: '#9b948a', beard: 'full', face: { eyes: 'dot', brows: 'skeptic', mouth: 'flat' } },
    tacitus: { body: 'toga', col: '#e3dccc', col2: '#f2ede2', stripe: '#7a3b8f', hair: 'short', hairCol: '#6b5a4a', face: { eyes: 'dot', brows: 'calm', mouth: 'flat' } },
    younger: { body: 'tunic', col: '#e6d6b0', col2: '#c9b48a', belt: '#8a5a34', hair: 'curly', hairCol: '#6b4022', face: { eyes: 'half', brows: 'worried', mouth: 'frown' } },
    elder: { body: 'toga', col: '#f0ebe0', col2: '#f6f2ea', stripe: '#7a3b8f', cloak: '#7a3b8f', hair: 'bald', hairCol: '#c2bab0', face: { eyes: 'dot', brows: 'up', mouth: 'smile' } },
    mother: { body: 'dress', col: '#9a6fae', hat: 'veil', hatCol: '#d8c9e3', hair: 'long', hairCol: '#4a3426', face: { eyes: 'dot', brows: 'worried', mouth: 'o' } },
    helmsman: { body: 'tunic', col: '#5f7f9f', hair: 'messy', hairCol: '#2f241e', beard: 'full', hat: 'pileus', hatCol: '#a5553a', face: { eyes: 'wide', brows: 'worried', mouth: 'open' } },
    sailor: { body: 'tunic', col: '#7a98b5', hair: 'short', hairCol: '#3a2a20', face: { eyes: 'dot', brows: 'worried', mouth: 'flat' } },
    king: { body: 'coat18', col: '#2f4f9a', col2: '#f1e2b5', hair: 'wig', hat: 'crown', cloak: '#b33a3a', legs: '#f2efe8', shoes: '#2b2420', face: { eyes: 'half', brows: 'calm', mouth: 'flat' } },
    alcub: { body: 'coat18', col: '#7a4a32', col2: '#e8d8b0', hair: 'wig', hat: 'tricorn', legs: '#e9e2d0', shoes: '#2b2420', beard: 'mustache', hairCol: '#3a2a20', face: { eyes: 'dot', brows: 'up', mouth: 'smile' } },
    digger: { body: 'tunic', col: '#a28b6a', hair: 'short', hairCol: '#3a2a20', hat: 'kerchief', hatCol: '#a64b3a', face: { eyes: 'dot', brows: 'calm', mouth: 'flat' } },
    tourist18: { body: 'coat18', col: '#5a8f6a', col2: '#efe2c0', hair: 'wig', hat: 'tricorn', hatCol: '#3a3540', legs: '#efe9da', shoes: '#2b2420', face: { eyes: 'dot', brows: 'up', mouth: 'smile' } },
    fiorelli: { body: 'suit', col: '#3b3a45', col2: '#f2efe8', tie: '#2b2420', legs: '#3b3a45', shoes: '#2b2420', hair: 'short', hairCol: '#2f241e', beard: 'mustache', face: { eyes: 'dot', brows: 'calm', mouth: 'flat' } },
    arch: { body: 'vest', col: '#6d8bb3', legs: '#8a7a62', shoes: '#5a4030', hat: 'hard', hair: 'short', face: { eyes: 'dot', brows: 'up', mouth: 'smile' } },
    arch2: { body: 'modern', col: '#c8644a', legs: '#5a6a7a', shoes: '#3a2a20', hat: 'sun', hair: 'long', hairCol: '#7a4a2a', face: { eyes: 'dot', brows: 'up', mouth: 'grin' } },
    arch3: { body: 'modern', col: '#6aa38a', legs: '#7a6a52', shoes: '#3a2a20', hat: 'cap', hatCol: '#2f4f7a', beard: 'full', hairCol: '#5a3a24', glasses: true, face: { eyes: 'dot', brows: 'up', mouth: 'o' } },
    director: { body: 'suit', col: '#4a5568', col2: '#f2efe8', tie: '#7a3b3b', legs: '#4a5568', shoes: '#2b2420', hair: 'short', hairCol: '#6b5a4a', glasses: true, beard: 'stubble', face: { eyes: 'dot', brows: 'calm', mouth: 'smile' } },
    scientist: { body: 'lab', col: '#f4f2ee', col2: '#8fb3d9', legs: '#4a5568', shoes: '#2b2420', hair: 'bun', hairCol: '#3a2a20', glasses: true, face: { eyes: 'dot', brows: 'up', mouth: 'flat' } },
    guide: { body: 'modern', col: '#d9534f', legs: '#3d4a5c', shoes: '#2b2420', hair: 'short', hairCol: '#2f241e', beard: 'mustache', face: { eyes: 'happy', brows: 'up', mouth: 'grin' } },
    tourist: { body: 'modern', col: '#f2c94c', legs: '#4a6fa5', shoes: '#f4f4f4', hat: 'cap', hatCol: '#e0605a', hair: 'short', face: { eyes: 'dot', brows: 'up', mouth: 'grin' } },
    pilot: { body: 'flight', col: '#7a5a3a', col2: '#efe6d6', legs: '#5a6248', shoes: '#2b2420', hat: 'pilot', face: { eyes: 'dot', brows: 'calm', mouth: 'flat' } },
    historian: { body: 'suit', col: '#6b5a48', col2: '#efe6d6', tie: '#3a5a7a', legs: '#4a4040', shoes: '#2b2420', hair: 'short', hairCol: '#9b948a', glasses: true, face: { eyes: 'dot', brows: 'skeptic', mouth: 'flat' } },
  };
  function cast(name, extra = {}) {
    const base = CAST[name];
    const o = Object.assign({}, base, extra);
    o.face = Object.assign({}, base.face, extra.face || {});
    return o;
  }

  // ---------------- animals ----------------
  function sheep(ctx, x, y, s = 1, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.mirror ? -1 : 1), s); if (o.rot) ctx.rotate(o.rot);
    for (const lx of [-18, -6, 10, 22]) { const up = o.hoof && lx === 22 ? -26 : 0; L(ctx, [[lx, -22], [lx + (up ? 14 : 0), up ? -30 : -2]], 7); L(ctx, [[lx, -22], [lx + (up ? 14 : 0), up ? -30 : -2]], 3.4, '#4a4040'); }
    P(ctx, '#f7f4ec', LW, c => { const pts = 11; for (let i = 0; i <= pts; i++) { const a = i / pts * Math.PI * 2, rr = 1 + .12 * Math.sin(i * 2.7 + 1); const px = Math.cos(a) * 34 * rr, py = -40 + Math.sin(a) * 22 * rr; i ? c.lineTo(px, py) : c.moveTo(px, py); } c.closePath(); });
    P(ctx, '#4a4040', LW, c => c.ellipse(36, -48, 13, 11, .3, 0, 7));
    P(ctx, '#4a4040', 2.4, c => c.ellipse(28, -56, 7, 4, -.6, 0, 7));
    ctx.fillStyle = '#fff'; const ey = o.closed ? 0 : 1; if (ey) { ctx.beginPath(); ctx.arc(40, -51, 2.6, 0, 7); ctx.fill(); }
    if (o.label) { ctx.font = '600 13px Fredoka'; }
    ctx.restore();
  }
  function horse(ctx, x, y, s = 1, o = {}) {
    const t = o.t || 0, col = o.col || '#8a5a34', mane = o.mane || '#3a2a20', gait = o.gait || 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.mirror ? -1 : 1), s);
    for (const [i, lx] of [[0, -46], [1, -32], [2, 34], [3, 48]]) { const sw = Math.sin(gait + i * 1.7) * (o.gaitAmp ?? 0) * 10; limbH(ctx, [[lx, -70], [lx + sw * .6, -38], [lx + sw, -4]], i % 2 ? shade(col, .85) : col); P(ctx, '#3a2a20', 2.2, c => c.rect(lx + sw - 6, -6, 12, 6)); }
    P(ctx, mane, LW, c => { c.moveTo(-70, -96); c.quadraticCurveTo(-96, -70, -84, -40); c.quadraticCurveTo(-80, -70, -66, -86); c.closePath(); });
    P(ctx, col, LW, c => { c.moveTo(-64, -104); c.quadraticCurveTo(-70, -66, -40, -62); c.lineTo(46, -62); c.quadraticCurveTo(72, -66, 66, -100); c.quadraticCurveTo(40, -112, -64, -104); c.closePath(); });
    P(ctx, col, LW, c => { c.moveTo(50, -100); c.quadraticCurveTo(66, -150, 82, -160); c.lineTo(108, -126); c.quadraticCurveTo(100, -116, 88, -122); c.quadraticCurveTo(80, -100, 70, -84); c.closePath(); });
    P(ctx, mane, LW, c => { c.moveTo(56, -108); c.quadraticCurveTo(64, -150, 82, -162); c.lineTo(76, -146); c.quadraticCurveTo(66, -126, 64, -104); c.closePath(); });
    P(ctx, col, 2.4, c => { c.moveTo(80, -160); c.lineTo(78, -176); c.lineTo(88, -162); c.closePath(); });
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(88, -146, 3, 0, 7); ctx.fill();
    if (o.saddle) P(ctx, o.saddle, 2.4, c => { c.moveTo(-26, -106); c.lineTo(22, -106); c.lineTo(18, -76); c.lineTo(-22, -76); c.closePath(); });
    ctx.restore();
  }
  function limbH(ctx, pts, col) { L(ctx, pts, 14 + LW * 1.6); L(ctx, pts, 14, col); }

  G.Folk = { INK, person, sprite, stamp, roman, cast, CAST, sheep, horse, shade, P, L, Q, TUNICS };
})(window);
