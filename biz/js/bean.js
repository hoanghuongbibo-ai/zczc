/* "Business story" cartoon cast, in the style of the channel's references:
 * big round heads, dot eyes + short brows, bean-shaped bodies on thin stick legs, thin black outlines.
 * The lead (and key people) get a skin tone; everyone else has a plain white face with a grey shading crescent.
 *
 * person(ctx, x, y, s, o) draws a figure standing with its feet at (x, y); s = 1 is ~360 px tall.
 * o = { skin: '#f2d2a9' | 'white', hair: 'short'|'side'|'bob'|'long'|'bun'|'greyBun'|'bald'|'none', hairColor,
 *       body: colour, top: 'plain'|'shirt'|'suit'|'cardigan', tie, legs: colour, glasses,
 *       face: { eyes: 1..0, look: [x,y], brows: 'calm'|'worried'|'angry'|'up'|'sad', mouth: 'smile'|'flat'|'frown'|'o'|'grin', tears, blush },
 *       armL / armR: [angle (rad, 0 = straight down, + = outward), bend (rad)], handL/handR: 'dot'|'hold',
 *       lean, bob, scaleHead } */
(function (G) {
  'use strict';
  const INK = '#2a2622', LW = 4.2;
  const SKIN = '#ffd3a8', WHITE = '#ffffff', SHADE = '#e3e6ec';

  function outline(ctx, path, fill, lw = LW) {
    ctx.beginPath(); path(ctx); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); }
  }
  const line = (ctx, pts, w = LW, c = INK) => { ctx.beginPath(); ctx.moveTo(...pts[0]); for (const p of pts.slice(1)) ctx.lineTo(...p); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); };
  const curve = (ctx, a, c, b, w = LW, col = INK) => { ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(...c, ...b); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); };

  // ---------- head ----------
  function head(ctx, cx, cy, r, o) {
    const f = o.face || {}, white = o.skin === 'white' || !o.skin && o.extra, skin = white ? WHITE : (o.skin || SKIN);
    const hc = o.hairColor || '#22201e';
    // hair behind the head
    if (o.hair === 'long') outline(ctx, c => { c.moveTo(cx - r * 1.05, cy - r * .2); c.quadraticCurveTo(cx - r * 1.25, cy + r * 1.2, cx - r * .9, cy + r * 1.55); c.lineTo(cx + r * .9, cy + r * 1.55); c.quadraticCurveTo(cx + r * 1.25, cy + r * 1.2, cx + r * 1.05, cy - r * .2); c.closePath(); }, hc);
    if (o.hair === 'bun' || o.hair === 'greyBun') outline(ctx, c => c.arc(cx + r * .1, cy - r * 1.05, r * .38, 0, Math.PI * 2), o.hair === 'greyBun' ? '#b9b6b0' : hc);
    if (o.hair === 'bob') outline(ctx, c => { c.moveTo(cx - r * 1.1, cy + r * .55); c.quadraticCurveTo(cx - r * 1.25, cy - r * 1.2, cx, cy - r * 1.12); c.quadraticCurveTo(cx + r * 1.25, cy - r * 1.2, cx + r * 1.1, cy + r * .55); c.closePath(); }, hc);
    // the face disc + shading crescent on white faces
    outline(ctx, c => c.arc(cx, cy, r, 0, Math.PI * 2), skin);
    if (white) { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - 2, 0, Math.PI * 2); ctx.clip(); ctx.fillStyle = SHADE; ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2); ctx.arc(cx - r * .32, cy, r * 1.04, Math.PI / 2, -Math.PI / 2, true); ctx.fill(); ctx.restore(); outline(ctx, c => c.arc(cx, cy, r, 0, Math.PI * 2), null); }
    // hair on top
    const grey = '#b9b6b0';
    if (o.hair === 'short' || o.hair === 'side' || o.hair === 'long' || o.hair === 'bun' || o.hair === 'greyBun') {
      const col = o.hair === 'greyBun' ? grey : hc;
      outline(ctx, c => { c.moveTo(cx - r * 1.02, cy - r * .05); c.quadraticCurveTo(cx - r * 1.12, cy - r * 1.15, cx, cy - r * 1.1); c.quadraticCurveTo(cx + r * 1.12, cy - r * 1.15, cx + r * 1.02, cy - r * .05);
        if (o.hair === 'side') { c.quadraticCurveTo(cx + r * .6, cy - r * .55, cx - r * .1, cy - r * .5); c.quadraticCurveTo(cx - r * .6, cy - r * .45, cx - r * 1.02, cy - r * .05); }
        else { c.quadraticCurveTo(cx + r * .7, cy - r * .62, cx + r * .2, cy - r * .55); c.lineTo(cx + r * .05, cy - r * .3); c.lineTo(cx - r * .15, cy - r * .55); c.quadraticCurveTo(cx - r * .7, cy - r * .6, cx - r * 1.02, cy - r * .05); }
        c.closePath(); }, col);
    }
    if (o.hair === 'bob') outline(ctx, c => { c.moveTo(cx - r * 1.05, cy + r * .5); c.quadraticCurveTo(cx - r * 1.15, cy - r * 1.2, cx, cy - r * 1.1); c.quadraticCurveTo(cx + r * 1.15, cy - r * 1.2, cx + r * 1.05, cy + r * .5); c.quadraticCurveTo(cx + r * .9, cy - r * .35, cx + r * .15, cy - r * .5); c.quadraticCurveTo(cx - r * .7, cy - r * .55, cx - r * .85, cy + r * .5); c.closePath(); }, hc);
    if (o.hair === 'bald') { outline(ctx, c => c.arc(cx - r * .95, cy + r * .1, r * .18, Math.PI * .5, Math.PI * 1.5), grey); outline(ctx, c => c.arc(cx + r * .95, cy + r * .1, r * .18, -Math.PI * .5, Math.PI * .5), grey); }
    // face
    const lk = f.look || [0, 0], ex = r * .3, ey = cy + r * .08 + lk[1] * r * .06, open = f.eyes ?? 1;
    for (const s of [-1, 1]) {
      const x = cx + s * ex + lk[0] * r * .12;
      if (open > .3) { ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(x, ey, r * .055, r * .07 * open, 0, 0, Math.PI * 2); ctx.fill(); }
      else curve(ctx, [x - r * .09, ey], [x, ey + r * .06], [x + r * .09, ey], 3);
      const by = cy - r * .12, br = f.brows || 'calm';
      const lift = br === 'up' ? -r * .1 : 0, din = br === 'worried' || br === 'sad' ? -r * .07 : br === 'angry' ? r * .07 : 0;   // inner end of the brow moves; outer end stays
      line(ctx, [[x - s * r * .11, by + lift + din], [x + s * r * .11, by + lift - din * .4]], 3.4);
      if (f.tears) { const k = (f.tears % 1); ctx.fillStyle = '#7fb6d9'; ctx.beginPath(); ctx.ellipse(x - s * r * .02, ey + r * .14 + k * r * .4, r * .035, r * .06, 0, 0, Math.PI * 2); ctx.fill(); line(ctx, [[x, ey + r * .06], [x, ey + r * .14 + k * r * .4]], 2.4, '#7fb6d9'); }
    }
    if (o.glasses) for (const s of [-1, 1]) { const x = cx + s * ex + lk[0] * r * .12; ctx.lineWidth = 2.6; ctx.strokeStyle = INK; ctx.strokeRect(x - r * .17, ey - r * .1, r * .34, r * .22); if (s < 0) line(ctx, [[x + r * .17, ey - r * .02], [x + ex * 2 - r * .17, ey - r * .02]], 2.4); }
    if (f.blush) { ctx.fillStyle = 'rgba(230,120,110,.25)'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + s * r * .48, cy + r * .32, r * .12, r * .06, 0, 0, Math.PI * 2); ctx.fill(); } }
    const my = cy + r * .45, mx = cx + lk[0] * r * .08, m = f.mouth || 'flat';
    if (m === 'smile') curve(ctx, [mx - r * .12, my - r * .02], [mx, my + r * .1], [mx + r * .12, my - r * .02], 3);
    else if (m === 'grin') outline(ctx, c => { c.moveTo(mx - r * .16, my - r * .04); c.quadraticCurveTo(mx, my + r * .2, mx + r * .16, my - r * .04); c.closePath(); }, '#fbfaf7', 2.6);
    else if (m === 'frown') curve(ctx, [mx - r * .11, my + r * .06], [mx, my - r * .05], [mx + r * .11, my + r * .06], 3);
    else if (m === 'o') outline(ctx, c => c.ellipse(mx, my + r * .02, r * .06, r * .08, 0, 0, Math.PI * 2), '#5a2a2a', 2.4);
    else line(ctx, [[mx - r * .09, my], [mx + r * .09, my]], 3);
    if (o.beard) outline(ctx, c => { c.moveTo(cx - r * .55, cy + r * .45); c.quadraticCurveTo(cx, cy + r * 1.15, cx + r * .55, cy + r * .45); c.quadraticCurveTo(cx, cy + r * .75, cx - r * .55, cy + r * .45); }, hc, 2.4);
  }

  // ---------- body ----------
  function person(ctx, x, y, s = 1, o = {}) {
    ctx.save(); ctx.translate(x, y + (o.bob || 0)); ctx.scale(s, s); ctx.rotate(o.lean || 0);
    const legs = o.legs || '#3a3a40', body = o.body || '#9aa0a6', hipY = -64, topY = -230, w = 58;
    // stick legs + little shoes
    for (const sx of [-18, 18]) { line(ctx, [[sx, hipY], [sx, -8]], 6.5); line(ctx, [[sx, hipY], [sx, -8]], 3.4, legs === 'skin' ? SKIN : legs); outline(ctx, c => c.ellipse(sx + (sx < 0 ? -4 : 4), -4, 13, 7, 0, 0, Math.PI * 2), o.shoes || INK, 2); }
    // arms (behind the body edge, thin)
    const arm = (side, spec) => {
      const [a, bend] = spec || [.12, 0], sh = [side * (w - 10), topY + 46], L1 = 62, L2 = 58;
      const ang = side * a, el = [sh[0] + Math.sin(ang) * L1, sh[1] + Math.cos(ang) * L1], ang2 = ang + side * bend, wr = [el[0] + Math.sin(ang2) * L2, el[1] + Math.cos(ang2) * L2];
      line(ctx, [sh, el, wr], 7); line(ctx, [sh, el, wr], 3.6, o.sleeve || body);
      outline(ctx, c => c.arc(wr[0], wr[1], 7.5, 0, Math.PI * 2), o.skin === 'white' ? WHITE : (o.skin || SKIN), 2.4);
      return wr;
    };
    const hands = {};
    if (!o.armsFront) { hands.L = arm(-1, o.armL); hands.R = arm(1, o.armR); }
    // the bean
    outline(ctx, c => { c.moveTo(-w, topY + 40); c.quadraticCurveTo(-w, topY, 0, topY); c.quadraticCurveTo(w, topY, w, topY + 40); c.quadraticCurveTo(w + 6, hipY - 20, w - 6, hipY); c.quadraticCurveTo(0, hipY + 12, -w + 6, hipY); c.quadraticCurveTo(-w - 6, hipY - 20, -w, topY + 40); c.closePath(); }, body);
    const top = o.top || 'plain';
    if (top === 'shirt' || top === 'suit' || top === 'cardigan') outline(ctx, c => { c.moveTo(-20, topY + 1); c.lineTo(0, topY + 34); c.lineTo(20, topY + 1); c.closePath(); }, '#fbfaf7', 2.6);
    if (top === 'suit') { line(ctx, [[-22, topY + 2], [-4, topY + 70]], 2.6); line(ctx, [[22, topY + 2], [4, topY + 70]], 2.6); if (o.tie) outline(ctx, c => { c.moveTo(-5, topY + 8); c.lineTo(5, topY + 8); c.lineTo(7, topY + 40); c.lineTo(0, topY + 48); c.lineTo(-7, topY + 40); c.closePath(); }, o.tie, 2); }
    if (top === 'cardigan') for (let i = 0; i < 3; i++) outline(ctx, c => c.arc(0, topY + 60 + i * 30, 3.5, 0, Math.PI * 2), '#e9e2d0', 1.6);
    if (o.armsFront) { hands.L = arm(-1, o.armL); hands.R = arm(1, o.armR); }
    // head (slightly overlapping the body top)
    const r = 70 * (o.scaleHead || 1); head(ctx, 0, topY - r + 18, r, o);
    ctx.restore();
    return { hands: { L: hands.L && [x + hands.L[0] * s, y + hands.L[1] * s], R: hands.R && [x + hands.R[0] * s, y + hands.R[1] * s] }, headTop: y + (topY - 2 * r + 18) * s };
  }
  // a soft elliptical floor shadow under a group (the references' "spotlight" look)
  function groundShadow(ctx, x, y, rx, ry = 22, a = .18) { ctx.save(); ctx.fillStyle = `rgba(40,30,20,${a})`; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }

  G.Bean = { person, head, outline, line, curve, groundShadow, INK, LW, SKIN, WHITE, SHADE };
})(window);
