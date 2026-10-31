/* G.DR — the "director" toolkit for the polished reference look (see the skill: REFERENCE STYLE).
 * One call composes a whole shot in layers:  background set (world space, through the camera, optionally depth-of-field
 * blurred) → background crowd → in-focus actors → out-of-focus foreground props → atmosphere → screen-space graphics.
 *
 *   DR.shot(ctx, lt, dur, t, {
 *     cam:  [x, y, z]  or  [[x0,y0,z0],[x1,y1,z1], ease?]     camera centre (world px) + zoom, animated over the shot
 *     bg:   (g, t) => …            the set (+ anything that should share its blur)
 *     dof:  0..12                  background blur in screen px (close-ups 5–9, mediums 2–3, wides 0)
 *     crowd:{ list | fn }          see DR.crowd — drawn with the background (blurred with it)
 *     act:  (g, t) => …            in-focus actors/props (world space, sharp)
 *     fg:   { kind, n, seed, blur, col, side }   blurred foreground props passing in front (parallax)
 *     atm:  { haze, glare:[x,y,r], dust, rain, snow, motes, birds, warm, cold, dark }
 *     ui:   (ctx) => …             screen-space overlays (labels, cards) — drawn after, never blurred
 *   })
 *   DR.toScreen(x, y)              world → screen with the current shot's camera (for arrows/labels pointing at actors)
 *   DR.crowd(g, list, t)           list of [who, x, y, s, opts] drawn from a sprite cache (hundreds per frame are cheap)
 *   DR.army(x0, y0, x1, y1, n, whoList, s0, s1, seed)   → crowd list on a perspective block (back rows smaller)
 *   Text kit (crisp UI layer): callout (box + red arrow), write (marker text writing on), banner (ribbon), sign (wooden
 *   sign that types on), tally (number + icons filling), statCard (game-UI card), mystery (locked ??? cards → reveal),
 *   exclaim (red "!" pop), sunburst (rays background), blueprint (grid bg) + pencil, circle (yellow hand-drawn circle).
 *   Cartoon map style: DR.map(ctx, t, v, o) on top of G.MAP (thick coastline, beige land, pale sea), mapWrite (marker
 *   place names writing on + red date), mapArmy, mapPortrait (face-in-circle pin), mapShip (along a dashed route). */
(function (G) {
  'use strict';
  const T = G.Toon, { W, H, clamp, lerp, rng } = T, TAU = Math.PI * 2, PI = Math.PI;
  const ease = { inOut: k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, out: k => 1 - Math.pow(1 - k, 3), in: k => k * k * k, lin: k => k, sine: k => .5 - .5 * Math.cos(PI * k) };
  const MK = s => `${s}px "Lilita One", "Luckiest Guy"`, HAND = s => `${s}px "Patrick Hand", Fredoka`;
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  const buf = mk(W, H), bg = buf.getContext('2d'), small = mk(320, 180), sg = small.getContext('2d'), fgc = mk(320, 180), fgg = fgc.getContext('2d');
  let CAM = { x: 640, y: 360, z: 1 };
  const camAt = (cam, lt, dur) => { if (!cam) return { x: 640, y: 360, z: 1 }; if (typeof cam[0] === 'number') return { x: cam[0], y: cam[1], z: cam[2] || 1 };
    const [a, b, e] = cam, k = (ease[e || 'sine'])(clamp(lt / Math.max(.01, dur))); return { x: lerp(a[0], b[0], k), y: lerp(a[1], b[1], k), z: Math.exp(lerp(Math.log(a[2] || 1), Math.log(b[2] || 1), k)) }; };
  const apply = (g, c) => { g.translate(640, 360); g.scale(c.z, c.z); g.translate(-c.x, -c.y); };
  const toScreen = (x, y) => [640 + (x - CAM.x) * CAM.z, 360 + (y - CAM.y) * CAM.z];
  // soft blur by drawing through a small canvas (filters on full-size canvases are slow in headless chrome)
  function blurInto(ctx, src, px) { if (px < .6) { ctx.drawImage(src, 0, 0); return; }
    const f = px > 6 ? 8 : px > 3 ? 5 : 3, w = Math.round(W / f), h = Math.round(H / f); small.width = w; small.height = h;
    sg.filter = `blur(${(px / f).toFixed(2)}px)`; sg.drawImage(src, 0, 0, w, h); sg.filter = 'none'; ctx.save(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(small, 0, 0, W, H); ctx.restore(); }

  // ---------- crowd sprites ----------
  const SPR = {};
  function sprite(who, o = {}) { const key = who + '|' + JSON.stringify(o); if (SPR[key]) return SPR[key]; const s = .5, c = mk(260, 420), g = c.getContext('2d');
    G.VK.fig(g, 130, 400, s, G.EP.cast(who, Object.assign({ t: 2.3 + (key.length % 7) * .41 }, o))); return (SPR[key] = c); }
  function crowd(g, list, t) { const L = list.slice().sort((a, b) => a[2] - b[2]);
    for (const [who, x, y, s, o = {}] of L) { if (typeof who === 'function') { g.save(); who(g, x, y, s, t, o); g.restore(); continue; } const sp = sprite(who, o.spr || {}), ph = (x * 13.7 + y * 7.1) % TAU, bob = o.still ? 0 : Math.abs(Math.sin(t * (o.walk ? 7 : 1.6) + ph)) * (o.walk ? 6 : 2) * s;
      g.save(); g.fillStyle = 'rgba(30,20,10,.22)'; g.beginPath(); g.ellipse(x, y + 2 * s, 46 * s, 9 * s, 0, 0, TAU); g.fill(); g.translate(x, y - bob); if (o.flip) g.scale(-1, 1); g.drawImage(sp, -130 * s * 2, -400 * s * 2, 260 * s * 2, 420 * s * 2); g.restore(); } }
  // a mounted rider as a crowd entry (sorted by its hooves with everyone else): DR.rider(who, { coat, dir, spr, hs })
  // horse scale = rider scale × hs; the rider's upper body sits on the saddle, one leg hangs down the near flank
  const WAIST = 300;
  function rider(who, ro = {}) { return (g, x, y, s, t, o = {}) => { const hs = s * (ro.hs || 2.3), dir = ro.dir || o.dir || 1, ph = (x * .37) % 6;
    g.fillStyle = 'rgba(30,20,10,.22)'; g.beginPath(); g.ellipse(x, y + 2 * hs, 110 * hs, 12 * hs, 0, 0, TAU); g.fill();
    G.Fauna.horse(g, x, y, hs, t + ph, { dir, coat: ro.coat || '#5a4a3a', mane: ro.mane });
    const sy = y - 132 * hs, rx = x - dir * 14 * hs, c = G.EP.cast(who, Object.assign({ t: 2.3 + ph, turn: dir * .7 }, ro.spr || {})), O = G.Guide.OUTFITS[c.outfit] || {}, L = O.legs || {};
    g.save(); g.beginPath(); g.rect(rx - 600 * s, sy - 1200 * s, 1200 * s, 1200 * s + 16 * hs); g.clip(); G.VK.fig(g, rx, sy + WAIST * s, s, c); g.restore();
    g.fillStyle = ro.blanket || '#8a2a22'; g.strokeStyle = '#2a1608'; g.lineWidth = 2.5 * hs; g.beginPath(); g.roundRect(rx - 36 * hs, sy - 2 * hs, 72 * hs, 44 * hs, 6 * hs); g.fill(); g.stroke();
    const lc = (L.kind === 'bare' ? null : (L.c || L.sock)) || '#3a3a44', bc = O.boot || '#2e2420', hip = [rx + dir * 8 * hs, sy + 30 * hs], knee = [rx + dir * 30 * hs, y - 78 * hs], ank = [rx + dir * 16 * hs, y - 48 * hs], lw = Math.max(5, 20 * hs);
    g.lineCap = 'round'; g.lineJoin = 'round'; for (const [w, col] of [[lw + 5, '#1e1410'], [lw, lc]]) { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(...hip); g.lineTo(...knee); g.lineTo(...ank); g.stroke(); }
    g.fillStyle = bc; g.strokeStyle = '#1e1410'; g.lineWidth = 2.5; g.beginPath(); g.ellipse(ank[0] + dir * 6 * hs, ank[1] + 4 * hs, 15 * hs, 9 * hs, 0, 0, TAU); g.fill(); g.stroke(); }; }
  function army(x0, y0, x1, y1, n, who, s0 = .2, s1 = .35, seed = 1, o = {}) { const r = rng(seed), L = []; const rows = Math.max(1, Math.round(Math.sqrt(n * (y1 - y0) / Math.max(1, x1 - x0)) * 1.4));
    for (let i = 0; i < n; i++) { const v = r(), y = lerp(y0, y1, v), s = lerp(s0, s1, v), x = lerp(x0, x1, r()) + (r() - .5) * 10; L.push([who[Math.floor(r() * who.length)], x, y, s, Object.assign({}, o, { spr: Object.assign({ turn: o.turn ?? (r() - .5) * .6 }, o.spr || {}) })]); } return L; }

  // ---------- foreground props (blurred, parallax) ----------
  function fgProps(ctx, f, c, t) { if (!f) return; const r = rng(f.seed || 3), n = f.n || 6, kind = f.kind || 'grass'; fgg.setTransform(1, 0, 0, 1, 0, 0); fgg.clearRect(0, 0, 320, 180); fgg.scale(.25, .25);
    const px = -(c.x - 640) * 1.6 * (f.par ?? 1), col = f.col || (kind === 'spears' ? '#4a3420' : kind === 'leaves' ? '#2e5a2e' : kind === 'shields' ? '#8a2a22' : '#3e6a2e');
    for (let i = 0; i < n; i++) { const x = ((r() * (W + 600) + px + (f.drift || 0) * t) % (W + 600) + W + 600) % (W + 600) - 300, side = f.side; if (side === 'L' && x > 420) continue; if (side === 'R' && x < 860) continue;
      fgg.save(); fgg.translate(x, H + 40); fgg.fillStyle = col; fgg.strokeStyle = col;
      if (kind === 'grass') { for (let k = 0; k < 9; k++) { fgg.beginPath(); const bx = (k - 4) * 16, h = 160 + r() * 200, sw = Math.sin(t * 1.3 + i + k) * 20; fgg.moveTo(bx - 10, 0); fgg.quadraticCurveTo(bx + sw * .5, -h * .6, bx + sw, -h); fgg.quadraticCurveTo(bx + sw * .5 + 6, -h * .6, bx + 10, 0); fgg.fill(); } }
      else if (kind === 'spears') { fgg.lineWidth = 16; fgg.beginPath(); fgg.moveTo(0, 0); fgg.lineTo(40 + r() * 60, -H - 200); fgg.stroke(); }
      else if (kind === 'leaves') { for (let k = 0; k < 6; k++) { fgg.beginPath(); fgg.ellipse((k - 3) * 60, -60 - r() * 300, 90, 40, r() * PI, 0, TAU); fgg.fill(); } }
      else if (kind === 'shields') { fgg.beginPath(); fgg.ellipse(0, -160, 170, 230, 0, 0, TAU); fgg.fill(); fgg.fillStyle = '#d8b04a'; fgg.beginPath(); fgg.arc(0, -160, 40, 0, TAU); fgg.fill(); }
      else if (kind === 'posts') { fgg.fillRect(-30, -H - 100, 60, H + 100); }
      else if (kind === 'heads') { fgg.fillStyle = f.col || '#2a2018'; fgg.beginPath(); fgg.ellipse(0, -60, 150, 170, 0, 0, TAU); fgg.fill(); fgg.fillRect(-170, -30, 340, 80); }
      fgg.restore(); }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = f.a ?? .9; ctx.filter = `blur(${f.blur ?? 3}px)`; ctx.drawImage(fgc, 0, 0, W, H); ctx.restore(); }

  // ---------- atmosphere ----------
  function atmos(ctx, a, t) { if (!a) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (a.warm) { ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = a.warm; ctx.fillStyle = '#ffb060'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
    if (a.cold) { ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = a.cold; ctx.fillStyle = '#8aa0c0'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
    if (a.haze) { const gr = ctx.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, `rgba(255,236,200,${a.haze})`); gr.addColorStop(.55, `rgba(255,236,200,${a.haze * .5})`); gr.addColorStop(1, 'rgba(255,236,200,0)'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); }
    if (a.glare) { const [x, y, r] = a.glare; T.glow(ctx, x, y, r || 380, 'rgba(255,240,200,.55)'); T.glow(ctx, x, y, (r || 380) * .25, 'rgba(255,255,240,.9)'); }
    if (a.dark) { ctx.fillStyle = `rgba(40,20,70,${a.dark})`; ctx.globalCompositeOperation = 'multiply'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; }
    if (a.night) { ctx.fillStyle = `rgba(16,22,60,${a.night})`; ctx.globalCompositeOperation = 'multiply'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; }
    if (a.rain) { const r = rng(5); ctx.strokeStyle = 'rgba(220,230,255,.45)'; ctx.lineWidth = 2; for (let i = 0; i < a.rain; i++) { const x = (r() * (W + 200) + t * 120) % (W + 200) - 100, y = (r() * H + t * 1400 * (.8 + r() * .4)) % (H + 60) - 30; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 8, y + 34); ctx.stroke(); } }
    if (a.snow) G.TS.snowfall && G.TS.snowfall(ctx, t, a.snow, .9, 30);
    if (a.dust) { const r = rng(9); for (let i = 0; i < a.dust; i++) { const x = (r() * W + t * 18 * (r() + .3)) % W, y = (r() * H + Math.sin(t + i) * 20 + H) % H; ctx.fillStyle = `rgba(255,240,210,${.25 + r() * .35})`; ctx.beginPath(); ctx.arc(x, y, 1 + r() * 2.5, 0, TAU); ctx.fill(); } }
    if (a.embers) { const r = rng(4); for (let i = 0; i < a.embers; i++) { const k = (t * (.2 + r() * .3) + r()) % 1, x = r() * W + Math.sin(t * 2 + i) * 30, y = H - k * H * 1.1; ctx.fillStyle = `rgba(255,${140 + r() * 80 | 0},60,${(1 - k) * .9})`; ctx.beginPath(); ctx.arc(x, y, 2 + r() * 2, 0, TAU); ctx.fill(); } }
    ctx.restore(); }

  // ---------- the shot ----------
  function shot(ctx, lt, dur, t, o) { const c = camAt(o.cam, lt, dur); if (o.shake) { const k = o.shake * Math.max(0, 1 - lt / .5); c.x += Math.sin(t * 61) * 14 * k / c.z; c.y += Math.sin(t * 47) * 10 * k / c.z; }
    // the camera never looks past the painted set (no black band under the ground or beside the scenery)
    if (!o.freeCam) { const hx = 640 / c.z, hy = 360 / c.z; if (hy * 2 <= H) c.y = clamp(c.y, hy, H - hy); if (hx * 2 <= W + 440) c.x = clamp(c.x, hx - 220, W + 220 - hx); }
    CAM = c; G.DR.cam = c;
    bg.setTransform(1, 0, 0, 1, 0, 0); bg.fillStyle = '#000'; bg.fillRect(0, 0, W, H); bg.save(); apply(bg, c);
    G.DR.crowdOn = !!o.crowd; if (o.bg) { o.bg(bg, t, lt); if (G.CL && G.CL.dressPlain !== false) { const src = o.bg.__src || (o.bg.__src = o.bg.toString()); if (src.length < 220 && /fillRect\(-300, -300, 1900, 1400\)/.test(src)) G.CL.dress(bg, t, 11 + (G.SHOTSEED || 0)); } } G.DR.crowdOn = false; if (o.crowd) crowd(bg, typeof o.crowd === 'function' ? o.crowd(t, lt) : o.crowd, t); if (o.bgAct) o.bgAct(bg, t, lt); bg.restore();
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); blurInto(ctx, buf, o.dof || 0); ctx.restore();
    if (o.act) { ctx.save(); apply(ctx, c); o.act(ctx, t, lt); ctx.restore(); }
    fgProps(ctx, o.fg, c, t); atmos(ctx, o.atm, t);
    if (o.ui) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); o.ui(ctx, t, lt); ctx.restore(); } }

  // ---------- text kit (crisp UI layer) ----------
  const UI = () => G.UI, pop = (lt, t0, d = .35) => { const k = clamp((lt - t0) / d); return k <= 0 ? 0 : G.FX ? G.FX.settle(k) : k; };
  function box(c, w, h, fill = '#fffdf6', lw = 5) { c.fillStyle = 'rgba(20,12,6,.35)'; c.fillRect(-w / 2 + 5, -h / 2 + 6, w, h); c.fillStyle = fill; c.fillRect(-w / 2, -h / 2, w, h); c.lineWidth = lw; c.strokeStyle = '#1e1612'; c.strokeRect(-w / 2, -h / 2, w, h); }
  function rbox(c, w, h, fill = '#ffffff') { c.fillStyle = 'rgba(10,6,4,.4)'; c.beginPath(); c.roundRect(-w / 2 + 5, -h / 2 + 7, w, h, h * .28); c.fill(); c.fillStyle = fill; c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, h * .28); c.fill(); c.lineWidth = 5; c.strokeStyle = '#15100c'; c.stroke(); }
  function arrowTo(c, x0, y0, x1, y1, k, col = '#d8261c') { if (k <= 0) return; const x = lerp(x0, x1, k), y = lerp(y0, y1, k), a = Math.atan2(y1 - y0, x1 - x0);
    c.save(); c.lineCap = 'round'; c.strokeStyle = '#1e1612'; c.lineWidth = 11; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x, y); c.stroke(); c.strokeStyle = col; c.lineWidth = 6; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x, y); c.stroke();
    c.translate(x, y); c.rotate(a); c.fillStyle = col; c.strokeStyle = '#1e1612'; c.lineWidth = 3; c.beginPath(); c.moveTo(14, 0); c.lineTo(-12, -13); c.lineTo(-12, 13); c.closePath(); c.fill(); c.stroke(); c.restore(); }
  // callout: label box at screen (x,y); arrow to a WORLD point (tx,ty) (or screen if o.screen)
  function callout(ctx, text, x, y, lt, t0, tx, ty, o = {}) { const k = pop(lt, t0); if (k <= 0) return; o = Object.assign({}, o, { size: Math.max(30, o.size || 34) }); ctx.save(); ctx.font = MK(o.size); const w = ctx.measureText(text).width + 40, h = o.size * 1.6; ctx.restore();
    const [sx, sy] = tx == null ? [null, null] : o.screen ? [tx, ty] : toScreen(tx, ty), ak = clamp((lt - t0 - .15) / .35);
    UI().box(ctx, x, y, w + 10, h + 10, c => { if (sx != null) { const ex = sx - x, ey = sy - y, d = Math.hypot(ex, ey), ux = ex / d, uy = ey / d, sx0 = x + ux * Math.min(w / 2, Math.abs(h / 2 / (uy || 1e-3))) * .9, sy0 = y + uy * Math.min(h / 2 + 4, Math.abs(w / 2 / (ux || 1e-3))); arrowTo(c, sx0, sy0, sx - ux * 18, sy - uy * 18, ak, o.arrow); }
      c.translate(x, y); c.rotate(o.rot || 0); c.scale(k, k); rbox(c, w, h, o.fill); c.font = MK(o.size || 30); c.fillStyle = o.ink || '#1e1612'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, 0, 3); }, { free: o.free }); }
  // title text (reference style): heavy rounded letters pop in — white (or o.col) fill, thick dark outline, drop shadow.
  // o.halo: outline colour (false → automatic: light edge on dark text, black on light text); o.underline: red swoosh
  function write(ctx, text, x, y, size, lt, t0, o = {}) { const k = pop(lt, t0, .3); if (k <= 0) return; ctx.save(); ctx.font = MK(size); const w = ctx.measureText(text).width; ctx.restore();
    const col = o.col || '#ffffff', dark = (() => { const h = col.replace('#', ''); if (h.length < 6) return false; const n = parseInt(h.slice(0, 6), 16); return ((n >> 16) * .3 + ((n >> 8) & 255) * .59 + (n & 255) * .11) < 110; })();
    const edge = o.halo === false || o.halo == null ? (dark ? 'rgba(255,250,238,.95)' : '#15100c') : o.halo, ew = dark ? size * .14 : size * .2;
    UI().box(ctx, x, y, w + 30, size * 1.4, c => { c.translate(x, y); c.rotate(o.rot || 0); c.scale(k, k); c.font = MK(size); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
      if (!dark) { c.fillStyle = 'rgba(10,6,4,.45)'; c.fillText(text, size * .06, size * .1); c.lineWidth = ew; c.strokeStyle = 'rgba(10,6,4,.45)'; c.strokeText(text, size * .06, size * .1); }
      c.lineWidth = ew; c.strokeStyle = edge; c.strokeText(text, 0, 0); c.fillStyle = col; c.fillText(text, 0, 0);
      if (o.underline) { const u = clamp((lt - t0 - .25) / .3); if (u > 0) { c.strokeStyle = '#15100c'; c.lineCap = 'round'; c.lineWidth = 11; c.beginPath(); c.moveTo(-w / 2, size * .58); c.quadraticCurveTo(0, size * .66, -w / 2 + w * u, size * .56); c.stroke(); c.strokeStyle = o.underline; c.lineWidth = 6; c.stroke(); } } }, { free: o.free }); }
  // slanted year tag (bottom-right, like the references): white box, heavy black italic text
  function yearTag(ctx, text, lt, t0, o = {}) { const k = clamp((lt - t0) / .3); if (k <= 0) return; const sz = o.size || 40; ctx.save(); ctx.font = MK(sz); const w = ctx.measureText(text).width + 50; ctx.restore(); const x = o.x ?? W - 40 - w / 2, y = o.y ?? H - 50;
    UI().box(ctx, x, y, w + 20, sz * 1.6, c => { c.translate(x + (1 - ease.out(k)) * 300, y); c.transform(1, 0, -.22, 1, 0, 0); c.fillStyle = 'rgba(10,6,4,.4)'; c.fillRect(-w / 2 + 6, -sz * .62 + 7, w, sz * 1.24); c.fillStyle = '#fff'; c.fillRect(-w / 2, -sz * .62, w, sz * 1.24); c.lineWidth = 5; c.strokeStyle = '#15100c'; c.strokeRect(-w / 2, -sz * .62, w, sz * 1.24);
      c.font = MK(sz); c.fillStyle = '#15100c'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, 0, 2); }, { free: true, keep: o.keep }); }
  function banner(ctx, text, x, y, lt, t0, o = {}) { const k = pop(lt, t0, .4); if (k <= 0) return; const sz = o.size || 42; ctx.save(); ctx.font = MK(sz); const w = ctx.measureText(text).width + 90; ctx.restore(); const n = Math.ceil(text.length * clamp((lt - t0 - .15) / .5));
    UI().box(ctx, x, y, w + 120, sz * 2.2, c => { c.translate(x, y); c.scale(k, k); c.rotate(o.rot ?? -.02); const h = sz * 1.5, col = o.col || '#c8281e';
      for (const sd of [-1, 1]) { c.fillStyle = G.Guide.hexMul(col, .7); c.beginPath(); c.moveTo(sd * (w / 2 - 20), -h / 2 + 14); c.lineTo(sd * (w / 2 + 50), -h / 2 + 14); c.lineTo(sd * (w / 2 + 30), 14); c.lineTo(sd * (w / 2 + 50), h / 2 + 14); c.lineTo(sd * (w / 2 - 20), h / 2 + 14); c.closePath(); c.fill(); c.lineWidth = 4; c.strokeStyle = '#1e1612'; c.stroke(); }
      c.fillStyle = col; c.fillRect(-w / 2, -h / 2, w, h); c.lineWidth = 5; c.strokeStyle = '#1e1612'; c.strokeRect(-w / 2, -h / 2, w, h); c.strokeStyle = 'rgba(255,230,180,.6)'; c.lineWidth = 2; c.strokeRect(-w / 2 + 7, -h / 2 + 7, w - 14, h - 14);
      c.font = MK(sz); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = sz * .16; c.strokeStyle = 'rgba(20,8,4,.85)'; c.strokeText(text.slice(0, n), 0, 3); c.fillStyle = '#fff8e8'; c.fillText(text.slice(0, n), 0, 3); }, { free: true }); }
  function sign(ctx, text, x, y, lt, t0, o = {}) { const k = pop(lt, t0, .4); if (k <= 0) return; const lines = text.split('\n'), sz = o.size || 30, n = Math.floor(text.length * clamp((lt - t0 - .3) / (text.length * .045)));
    ctx.save(); ctx.font = MK(sz); const w = Math.max(...lines.map(l => ctx.measureText(l).width)) + 70, h = lines.length * sz * 1.35 + 44; ctx.restore();
    UI().box(ctx, x, y, w + 20, h + 20, c => { c.translate(x, y); c.scale(k, k); c.rotate(o.rot ?? -.02); c.fillStyle = 'rgba(20,10,5,.4)'; c.fillRect(-w / 2 + 6, -h / 2 + 8, w, h); c.fillStyle = '#8a5a34'; c.fillRect(-w / 2, -h / 2, w, h); c.lineWidth = 5; c.strokeStyle = '#2a1608'; c.strokeRect(-w / 2, -h / 2, w, h);
      c.fillStyle = '#f4e6c8'; c.fillRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24); for (const sx of [-1, 1]) { c.fillStyle = '#c8322a'; c.beginPath(); c.arc(sx * (w / 2 - 22), -h / 2 + 22, 7, 0, TAU); c.fill(); }
      c.font = MK(sz); c.fillStyle = '#2a1a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; let left = n; lines.forEach((l, i) => { const s = l.slice(0, Math.max(0, left)); left -= l.length + 1; c.fillText(s, 0, -h / 2 + 22 + sz * .7 + i * sz * 1.35); }); }, { free: true }); }
  function tally(ctx, num, icon, x, y, lt, t0, o = {}) { const k = pop(lt, t0); if (k <= 0) return; const n = o.n ?? Math.min(20, num), shown = Math.floor(n * clamp((lt - t0 - .3) / (o.d || 1.4))), h = 96, lab = o.label || String(num); ctx.save(); ctx.font = MK(50); const lw = ctx.measureText(lab).width + 40; ctx.restore(); const w = lw + 40 + Math.min(14, n) * 30;
    UI().box(ctx, x, y, w + 20, h + 20, c => { c.translate(x, y); c.scale(k, k); box(c, w, h, '#f6efe0'); c.font = MK(50); c.fillStyle = '#c8281e'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(lab, -w / 2 + lw / 2 + 4, 4); c.fillStyle = '#1e1612'; c.fillRect(-w / 2 + lw + 6, -h / 2 + 10, 4, h - 20);
      for (let i = 0; i < shown; i++) { c.save(); c.translate(-w / 2 + lw + 34 + (i % 14) * 30, (n > 14 ? -18 : 0) + Math.floor(i / 14) * 36); icon(c); c.restore(); } }, { free: true }); }
  function statCard(ctx, o, x, y, lt, t0) { const k = pop(lt, t0, .4); if (k <= 0) return; const w = 470, h = 150 + o.stats.length * 46;
    UI().box(ctx, x, y, w + 20, h + 20, c => { c.translate(x, y); c.scale(k, k); c.rotate(.02); c.fillStyle = 'rgba(10,6,4,.45)'; c.fillRect(-w / 2 + 8, -h / 2 + 10, w, h); c.fillStyle = '#2e2a36'; c.fillRect(-w / 2, -h / 2, w, h); c.lineWidth = 6; c.strokeStyle = '#d8b04a'; c.strokeRect(-w / 2 + 3, -h / 2 + 3, w - 6, h - 6);
      c.fillStyle = '#f4e6c8'; c.beginPath(); c.arc(-w / 2 + 78, -h / 2 + 76, 56, 0, TAU); c.fill(); c.lineWidth = 6; c.strokeStyle = '#d8b04a'; c.stroke(); if (o.who) { c.save(); c.beginPath(); c.arc(-w / 2 + 78, -h / 2 + 76, 52, 0, TAU); c.clip(); G.VK.fig(c, -w / 2 + 78, -h / 2 + 76 + 130, .32, G.EP.cast(o.who, { t: 2, face: o.face })); c.restore(); }
      c.fillStyle = '#c8281e'; c.fillRect(-w / 2 + 146, -h / 2 + 28, w - 170, 50); c.font = MK(30); c.fillStyle = '#fff'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(o.name, -w / 2 + 160, -h / 2 + 55);
      c.font = MK(22); c.fillStyle = '#e8c45a'; c.fillText(o.cls || '', -w / 2 + 160, -h / 2 + 104);
      o.stats.forEach(([lab, v], i) => { const yy = -h / 2 + 170 + i * 46; c.font = MK(24); c.fillStyle = '#f4e6c8'; c.fillText(lab, -w / 2 + 34, yy); const shownV = clamp((lt - t0 - .4 - i * .25) / .4) * v;
        for (let s = 0; s < 5; s++) { const sx = w / 2 - 190 + s * 34; c.fillStyle = s < shownV ? '#f2c43a' : 'rgba(255,255,255,.18)'; star(c, sx, yy, 13); } }); }, { free: true }); }
  function star(c, x, y, r) { c.beginPath(); for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * PI / 5, rr = i % 2 ? r * .45 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fill(); }
  // mystery cards: list of {who|null, name}; reveal[i] = time the i-th card flips; cards slide in from t0
  function mystery(ctx, cards, x, y, lt, t0, reveal = [], o = {}) { const n = cards.length, cw = o.w || 190, ch = cw * 1.42, gap = 30, tot = n * cw + (n - 1) * gap;
    cards.forEach((cd, i) => { const k = pop(lt, t0 + i * .15, .35); if (k <= 0) return; const cx = x - tot / 2 + cw / 2 + i * (cw + gap), fl = reveal[i] != null ? clamp((lt - reveal[i]) / .4) : 0, sx = Math.abs(Math.cos(fl * PI)), front = fl > .5;
      UI().box(ctx, cx, y, cw + 20, ch + 20, c => { c.translate(cx, y); c.scale(k * Math.max(.04, sx) * (front ? 1.06 : 1), k * (front ? 1.06 : 1)); c.fillStyle = 'rgba(10,6,4,.45)'; c.fillRect(-cw / 2 + 7, -ch / 2 + 9, cw, ch);
        c.fillStyle = front ? '#c8281e' : '#3a3650'; c.fillRect(-cw / 2, -ch / 2, cw, ch); c.lineWidth = 7; c.strokeStyle = '#d8b04a'; c.strokeRect(-cw / 2 + 4, -ch / 2 + 4, cw - 8, ch - 8);
        c.fillStyle = '#d8b04a'; c.beginPath(); c.arc(0, -ch / 2 + 2, 24, 0, TAU); c.fill(); c.font = MK(26); c.fillStyle = '#1e1612'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(i + 1), 0, -ch / 2 + 4);
        c.save(); c.beginPath(); c.rect(-cw / 2 + 14, -ch / 2 + 30, cw - 28, ch - 100); c.clip(); c.fillStyle = front ? '#f2d8a8' : '#24223a'; c.fillRect(-cw / 2, -ch / 2, cw, ch);
        if (front && cd.who) G.VK.fig(c, 0, ch / 2 + 60, .5, G.EP.cast(cd.who, { t: 2, face: cd.face || { mouth: 'grin', eyes: 'happy' } })); else { c.font = MK(90); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillText('?', 0, -10); c.fillStyle = '#d8b04a'; c.fillRect(-22, 40, 44, 34); c.lineWidth = 7; c.strokeStyle = '#d8b04a'; c.beginPath(); c.arc(0, 40, 16, PI, TAU); c.stroke(); }
        c.restore(); c.fillStyle = '#1e1612'; c.fillRect(-cw / 2 + 10, ch / 2 - 62, cw - 20, 48); c.font = MK(front ? 22 : 26); c.fillStyle = front ? '#fff' : '#d8b04a'; c.fillText(front ? cd.name : '???', 0, ch / 2 - 37); }, { free: true }); }); }
  function exclaim(ctx, x, y, lt, t0, o = {}) { const k = pop(lt, t0, .25); if (k <= 0 || lt > t0 + (o.hold || 1.6)) return; UI().box(ctx, x, y, 80, 100, c => { c.translate(x, y); c.scale(k, k); c.fillStyle = o.col || '#d8261c'; c.beginPath(); c.moveTo(0, 44); c.lineTo(-14, 26); c.arc(0, 0, 34, PI * .7, PI * 2.3); c.closePath(); c.fill(); c.lineWidth = 4; c.strokeStyle = '#fff'; c.stroke(); c.font = MK(46); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(o.ch || '!', 0, 2); }, { free: true }); }
  function sunburst(g, t, c1 = '#f4c048', c2 = '#f8dc8a', cx = 640, cy = 470) { g.fillStyle = c2; g.fillRect(-2000, -2000, 5000, 5000); g.save(); g.translate(cx, cy); g.rotate(t * .05); g.fillStyle = c1; for (let i = 0; i < 18; i++) { g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 2000, i * TAU / 18, i * TAU / 18 + TAU / 36); g.closePath(); g.fill(); } g.restore();
    const gr = g.createRadialGradient(cx, cy, 50, cx, cy, 900); gr.addColorStop(0, 'rgba(255,255,240,.5)'); gr.addColorStop(1, 'rgba(255,255,240,0)'); g.fillStyle = gr; g.fillRect(cx - 900, cy - 900, 1800, 1800); }
  function blueprint(g) { g.fillStyle = '#1e4f8a'; g.fillRect(-2000, -2000, 5000, 5000); g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 1; for (let x = -200; x < 1500; x += 20) { g.beginPath(); g.moveTo(x, -200); g.lineTo(x, 1000); g.stroke(); } for (let y = -200; y < 1000; y += 20) { g.beginPath(); g.moveTo(-200, y); g.lineTo(1500, y); g.stroke(); }
    g.strokeStyle = 'rgba(255,255,255,.18)'; for (let x = -200; x < 1500; x += 100) { g.beginPath(); g.moveTo(x, -200); g.lineTo(x, 1000); g.stroke(); } for (let y = -200; y < 1000; y += 100) { g.beginPath(); g.moveTo(-200, y); g.lineTo(1500, y); g.stroke(); } }
  // blueprint line art: segments [[x0,y0,x1,y1]…] drawn on progressively with k (0..1); a pencil follows the tip
  function bpDraw(g, segs, k, o = {}) { let L = 0; const d = segs.map(s => { const l = Math.hypot(s[2] - s[0], s[3] - s[1]); L += l; return l; }); let rem = L * clamp(k), tip = null;
    g.save(); g.strokeStyle = o.col || 'rgba(240,248,255,.95)'; g.lineWidth = o.w || 4; g.lineCap = 'round'; for (let i = 0; i < segs.length && rem > 0; i++) { const f = Math.min(1, rem / d[i]), [a, b, c2, e] = segs[i], x = lerp(a, c2, f), y = lerp(b, e, f); g.beginPath(); g.moveTo(a, b); g.lineTo(x, y); g.stroke(); tip = [x, y]; rem -= d[i]; } g.restore();
    if (tip && k < 1 && o.pencil !== false) pencil(g, tip[0], tip[1]); }
  function pencil(g, x, y) { g.save(); g.translate(x, y); g.rotate(-.5); g.fillStyle = '#f2c43a'; g.strokeStyle = '#1e1612'; g.lineWidth = 3; g.fillRect(-10, -150, 20, 120); g.strokeRect(-10, -150, 20, 120); g.fillStyle = '#f2d8b0'; g.beginPath(); g.moveTo(-10, -30); g.lineTo(10, -30); g.lineTo(0, 0); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#e88aa0'; g.fillRect(-10, -170, 20, 20); g.strokeRect(-10, -170, 20, 20); g.restore(); }
  function circle(ctx, x, y, rx, ry, lt, t0, o = {}) { const k = clamp((lt - t0) / .4); if (k <= 0) return; UI().box(ctx, x, y, rx * 2 + 20, ry * 2 + 20, c => { c.lineCap = 'round'; c.strokeStyle = o.col || '#f2d23a'; c.lineWidth = o.w || 7; c.beginPath(); for (let a = 0; a <= TAU * 1.08 * k; a += .08) { const r = 1 + Math.sin(a * 3) * .03; c.lineTo(x + Math.cos(a - .6) * rx * r, y + Math.sin(a - .6) * ry * r); } c.stroke(); }, { free: true }); }

  // ---------- cartoon map style ----------
  function map(ctx, t, v, o = {}) { const M = G.MAP; ctx.save(); ctx.fillStyle = o.sea || '#c4dade'; ctx.fillRect(0, 0, W, H);
    const r = rng(3); ctx.strokeStyle = 'rgba(80,120,140,.35)'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = 0; i < 26; i++) { const x = r() * W, y = r() * H; ctx.beginPath(); ctx.arc(x, y, 14, PI * 1.15, PI * 1.85); ctx.arc(x + 26, y, 14, PI * 1.15, PI * 1.85); ctx.stroke(); }
    const land = M.landPath(v); ctx.fillStyle = 'rgba(30,20,10,.18)'; ctx.save(); ctx.translate(6, 8); ctx.fill(land); ctx.restore(); ctx.fillStyle = o.land || '#efd49c'; ctx.fill(land);
    ctx.save(); ctx.clip(land); const gr = ctx.createRadialGradient(W * .4, H * .3, 100, W * .5, H * .5, 900); gr.addColorStop(0, 'rgba(255,250,230,.35)'); gr.addColorStop(1, 'rgba(160,110,50,.18)'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); if (G.Paint2) G.Paint2.grain(ctx, 0, 0, W, H, .22, 13, 'multiply', 1.3); ctx.restore();
    ctx.lineJoin = 'round'; ctx.strokeStyle = '#2a1e18'; ctx.lineWidth = o.lw || 7; ctx.stroke(land);
    const lk = new Path2D(); for (const r of G.GEO.lakes) { let mnx = 1e9, mxx = -1e9; for (let i = 0; i < r.length; i += 2) { mnx = Math.min(mnx, r[i]); mxx = Math.max(mxx, r[i]); } if ((mxx - mnx) * v.k < 4) continue; const [x0, y0] = M.pt(v, r[0], r[1]); lk.moveTo(x0, y0); for (let i = 2; i < r.length; i += 2) lk.lineTo(...M.pt(v, r[i], r[i + 1])); lk.closePath(); }
    ctx.fillStyle = o.sea || '#c4dade'; ctx.fill(lk); ctx.lineWidth = (o.lw || 7) * .6; ctx.stroke(lk);
    for (const [lon, lat, rx, ry] of (o.extraLakes || [])) { const [x, y] = M.pt(v, lon, lat); ctx.beginPath(); ctx.ellipse(x, y, rx * v.k, ry * v.k, -.6, 0, TAU); ctx.fillStyle = o.sea || '#c4dade'; ctx.fill(); ctx.stroke(); }
    ctx.restore(); }
  function mapWrite(ctx, v, lon, lat, name, lt, t0, o = {}) { const [x, y] = G.MAP.pt(v, lon, lat); write(ctx, name, x + (o.dx || 0), y + (o.dy ?? 60), o.size || 54, lt, t0, { col: '#2a1e18', halo: false });
    if (o.date) write(ctx, o.date, x + (o.dx || 0) + (o.ddx || 0), y + (o.dy ?? 60) + (o.size || 54) * .95, (o.size || 54) * .9, lt, t0 + .5, { col: '#c8281e', halo: false, underline: '#c8281e' }); }
  function mapPin(ctx, v, lon, lat, lt, t0) { const [x, y] = G.MAP.pt(v, lon, lat), k = pop(lt, t0, .35); if (k <= 0) return; ctx.save(); ctx.translate(x, y - (1 - k) * 60); ctx.scale(1.2, 1.2); ctx.lineWidth = 4; ctx.strokeStyle = '#7a1410'; ctx.fillStyle = '#e0261c';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-24, -32, -17, -54, 0, -54); ctx.bezierCurveTo(17, -54, 24, -32, 0, 0); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, -37, 8, 0, TAU); ctx.fill(); ctx.restore(); }
  function mapPortrait(ctx, v, lon, lat, who, lt, t0, o = {}) { const [x, y] = G.MAP.pt(v, lon, lat), k = pop(lt, t0, .35); if (k <= 0) return; const R = o.r || 58; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = '#fffdf6'; ctx.strokeStyle = '#2a1e18'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-16, -R - 6); ctx.lineTo(16, -R - 6); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -R * 2 - 10, R, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.arc(0, -R * 2 - 10, R - 5, 0, TAU); ctx.clip(); ctx.fillStyle = o.bgc || '#f4dcae'; ctx.fillRect(-R, -R * 3, R * 2, R * 2); G.VK.fig(ctx, 0, -R * 2 - 10 + R * 2.6, R / 160, G.EP.cast(who, { t: 2 + lt, face: o.face })); ctx.restore(); ctx.restore(); }
  function mapArmy(ctx, v, lon, lat, who, n, lt, t0, o = {}) { const [x, y] = G.MAP.pt(v, lon, lat), k = clamp((lt - t0) / .4); if (k <= 0) return; const L = []; const r = rng(Math.round(lon * 10 + lat));
    for (let i = 0; i < n; i++) L.push([who[i % who.length], x + ((i % 4) - 1.5) * 26 + r() * 6, y + Math.floor(i / 4) * 14, o.s || .14, { walk: o.walk }]); ctx.save(); ctx.globalAlpha = k; crowd(ctx, L, lt); ctx.restore(); }
  function mapShip(ctx, v, pts, k, t) { const P = pts.map(([a, b]) => G.MAP.pt(v, a, b)); let L = 0; const d = []; for (let i = 1; i < P.length; i++) { d.push(Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1])); L += d[i - 1]; }
    ctx.save(); ctx.setLineDash([12, 10]); ctx.lineWidth = 4; ctx.strokeStyle = '#c8281e'; ctx.beginPath(); let rem = L * k, end = P[0], dir = 0; ctx.moveTo(...P[0]); for (let i = 1; i < P.length && rem > 0; i++) { const f = Math.min(1, rem / d[i - 1]); end = [lerp(P[i - 1][0], P[i][0], f), lerp(P[i - 1][1], P[i][1], f)]; dir = P[i][0] - P[i - 1][0]; ctx.lineTo(...end); rem -= d[i - 1]; } ctx.stroke(); ctx.setLineDash([]);
    if (k > 0 && G.TS.boat) G.TS.boat(ctx, end[0], end[1] + 6, .3, t, 'roman', 0); ctx.restore(); return end; }

  G.DR = { shot, toScreen, crowd, army, rider, sprite, callout, write, yearTag, rbox, banner, sign, tally, statCard, mystery, exclaim, sunburst, blueprint, bpDraw, pencil, circle, map, mapWrite, mapPin, mapPortrait, mapArmy, mapShip, arrowTo, box, ease, MK, HAND, atmos, fgProps, cam: CAM, blurInto };
})(window);
