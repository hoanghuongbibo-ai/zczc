/* The American Revolution — mixed-media layer: real paintings and photos inside the cartoon world, and the editing tricks.
 *  - museum(): a painting in a gilded frame on a gallery wall, a brass plaque (title · artist · year) that doubles as the credit
 *  - living(): a full-screen painting with a slow Ken Burns move, film grain and weather/smoke drawn over it
 *  - cutout(): a photo cut-out that drops / slides / peels in with a bounce (built on Col.photo)
 *  - note(): a sticky-note callout with a hand-drawn arrow to a detail, the myth-buster voice of the channel
 *  - desk: Col.bg('kraft') becomes a busy 1770s writing desk (quill, ink, letters, coins, wax, musket and powder horn photos)
 *  - transitions: whip pans, smash zooms, ink blots and flashes on chosen cuts (TRANS), with their sounds
 */
(function (G) {
  'use strict';
  const C = G.Col, S = G.Scenes, P = G.Paint, { clamp, lerp, ease, INK, rng, mix } = C, k01 = S.k01, X = {};
  const IMG = k => G.Toon.IMG[k];
  // ---------- crop helper: [sx, sy, sw, sh] in 0..1, zoomed around a focus point, for a Ken Burns move inside any frame ----------
  X.kb = (k, z = 1, fx = .5, fy = .5, aspect) => { const im = IMG(k); if (!im) return [0, 0, 1, 1]; let w = 1 / z, h = 1 / z; if (aspect) { const ia = im.width / im.height; if (ia > aspect) w = h * aspect / ia; else h = w * ia / aspect; } return [clamp(fx - w / 2, 0, 1 - w), clamp(fy - h / 2, 0, 1 - h), w, h]; };
  // ---------- gilded frame ----------
  X.frame = (ctx, k, x, y, w, h, o = {}) => { const im = IMG(k); if (!im) return; const b = o.border ?? Math.max(18, Math.min(w, h) * .07); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const s = o.k == null ? 1 : ease.back(clamp(o.k)); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-w / 2 - b + 10, -h / 2 - b + 16, w + 2 * b, h + 2 * b);
    const g = ctx.createLinearGradient(-w / 2 - b, -h / 2 - b, w / 2 + b, h / 2 + b); g.addColorStop(0, '#f4d878'); g.addColorStop(.35, '#b8862a'); g.addColorStop(.6, '#f0c860'); g.addColorStop(1, '#7a5418'); ctx.fillStyle = g; ctx.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b);
    ctx.strokeStyle = 'rgba(90,60,10,.8)'; ctx.lineWidth = 3; ctx.strokeRect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b); ctx.strokeStyle = 'rgba(255,240,180,.7)'; ctx.lineWidth = 2; ctx.strokeRect(-w / 2 - b * .55, -h / 2 - b * .55, w + b * 1.1, h + b * 1.1);
    const R = rng(w | 0); ctx.fillStyle = 'rgba(120,80,20,.55)'; for (let i = 0; i < 40; i++) { const side = i % 4, u = R(); const px = side < 2 ? lerp(-w / 2 - b, w / 2 + b, u) : (side === 2 ? -w / 2 - b * .75 : w / 2 + b * .75), py = side < 2 ? (side ? h / 2 + b * .75 : -h / 2 - b * .75) : lerp(-h / 2 - b, h / 2 + b, u); ctx.beginPath(); ctx.arc(px, py, b * .12, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#2a1e10'; ctx.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8); const cr = o.crop || X.kb(k, 1, .5, .5, w / h); ctx.drawImage(im, cr[0] * im.width, cr[1] * im.height, cr[2] * im.width, cr[3] * im.height, -w / 2, -h / 2, w, h);
    const v = ctx.createRadialGradient(0, 0, Math.min(w, h) * .3, 0, 0, Math.max(w, h) * .75); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(20,10,0,.28)'); ctx.fillStyle = v; ctx.fillRect(-w / 2, -h / 2, w, h);
    if (o.plaque) { const [t1, t2] = o.plaque; ctx.font = '700 17px Fredoka'; const pw = Math.max(ctx.measureText(t1).width, ctx.measureText(t2 || '').width) + 40; const py = h / 2 + b + 26; const pg = ctx.createLinearGradient(0, py - 20, 0, py + 26); pg.addColorStop(0, '#e8c868'); pg.addColorStop(1, '#a87a28'); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-pw / 2 + 4, py - 18, pw, 48); ctx.fillStyle = pg; ctx.fillRect(-pw / 2, py - 22, pw, 48); ctx.strokeStyle = '#6a4a14'; ctx.lineWidth = 2; ctx.strokeRect(-pw / 2, py - 22, pw, 48);
      ctx.fillStyle = '#2a1a08'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(t1, 0, py - 6); ctx.font = '600 13px Fredoka'; if (t2) ctx.fillText(t2, 0, py + 13); }
    ctx.restore(); };
  // ---------- the gallery wall ----------
  X.wall = (ctx, t, o = {}) => { const col = o.col || '#2e4a40'; ctx.fillStyle = col; ctx.fillRect(-300, -300, 1900, 1400); ctx.strokeStyle = mix(col, '#000000', .25); ctx.lineWidth = 2; for (let x = -300; x < 1600; x += 46) { ctx.beginPath(); ctx.moveTo(x, -300); ctx.lineTo(x, 640); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.04)'; for (let y = -280; y < 640; y += 60) for (let x = -280 + ((y / 60) % 2) * 23; x < 1600; x += 46) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 8, y + 12); ctx.lineTo(x, y + 24); ctx.lineTo(x - 8, y + 12); ctx.fill(); }
    ctx.fillStyle = '#5a3a24'; ctx.fillRect(-300, 640, 1900, 30); ctx.fillStyle = '#7a5434'; ctx.fillRect(-300, 670, 1900, 400); ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 2; for (let x = -300; x < 1600; x += 90) { ctx.beginPath(); ctx.moveTo(x, 670); ctx.lineTo(x - 60, 1000); ctx.stroke(); }
    const sx = o.spot ?? 640, sg = ctx.createRadialGradient(sx, 120, 40, sx, 360, 620); sg.addColorStop(0, 'rgba(255,240,200,.35)'); sg.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = sg; ctx.fillRect(-300, -300, 1900, 1400);
    ctx.fillStyle = '#1e1a16'; ctx.beginPath(); ctx.moveTo(sx - 30, -10); ctx.lineTo(sx + 30, -10); ctx.lineTo(sx + 16, 26); ctx.lineTo(sx - 16, 26); ctx.fill(); };
  // ---------- a museum shot: wall + framed painting (with an inner Ken Burns move) ----------
  X.museum = (ctx, k, lt, dur, t, o = {}) => { const im = IMG(k); if (!im) return null; const asp = im.width / im.height; const maxW = o.maxW || 760, maxH = o.maxH || 440; let w = maxW, h = w / asp; if (h > maxH) { h = maxH; w = h * asp; }
    const c = G.Cine.cam(lt, dur, o.from || { z: 1.0 }, o.to || { z: 1.08 }); G.Cine.layer(ctx, c, 1, () => { X.wall(ctx, t, o); const fx = o.fx ?? .5, fy = o.fy ?? .5, z = lerp(o.z0 ?? 1, o.z1 ?? 1.12, ease.inOut(clamp(lt / dur)));
      X.frame(ctx, k, o.x ?? 640, o.y ?? 330, w, h, { crop: X.kb(k, z, fx, fy, w / h), plaque: o.plaque, k: o.k, rot: o.rot }); if (o.fg) o.fg(ctx, w, h); });
    return { x: o.x ?? 640, y: o.y ?? 330, w, h }; };
  // ---------- a full-screen living painting ----------
  X.living = (ctx, k, lt, dur, t, o = {}) => { const im = IMG(k); if (!im) return; const z = lerp(o.z0 ?? 1.0, o.z1 ?? 1.15, ease.inOut(clamp(lt / dur))), fx = lerp(o.fx0 ?? .5, o.fx1 ?? .5, ease.inOut(clamp(lt / dur))), fy = lerp(o.fy0 ?? .5, o.fy1 ?? .5, ease.inOut(clamp(lt / dur)));
    const cr = X.kb(k, z, fx, fy, 1280 / 720); ctx.drawImage(im, cr[0] * im.width, cr[1] * im.height, cr[2] * im.width, cr[3] * im.height, 0, 0, 1280, 720);
    if (o.tint) { ctx.fillStyle = o.tint; ctx.fillRect(0, 0, 1280, 720); }
    const R = rng(((t * 24) | 0) % 97); ctx.fillStyle = 'rgba(255,255,255,.035)'; for (let i = 0; i < 260; i++) ctx.fillRect(R() * 1280, R() * 720, 2, 2); ctx.fillStyle = 'rgba(0,0,0,.05)'; for (let i = 0; i < 260; i++) ctx.fillRect(R() * 1280, R() * 720, 2, 2);
    const v = ctx.createRadialGradient(640, 360, 260, 640, 360, 820); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(10,5,0,.5)'); ctx.fillStyle = v; ctx.fillRect(0, 0, 1280, 720); };
  // ---------- photo cut-out with an entrance ----------
  X.cutout = (ctx, k, x, y, w, h, t, kt, o = {}) => { if (t < kt) return; const u = clamp((t - kt) / (o.dur || .45)), how = o.how || 'drop'; ctx.save();
    if (how === 'drop') { const s = lerp(1.35, 1, ease.out(u)); ctx.globalAlpha = clamp(u * 3); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); }
    else if (how === 'slide') { ctx.translate(lerp(o.dx ?? 900, 0, ease.out(u)), 0); }
    else if (how === 'pop') { const s = ease.back(u); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); }
    const wob = o.wobble === false ? 0 : Math.sin(t * 1.3 + w) * .008; C.photo(ctx, k, x, y, w, h, Object.assign({ rot: (o.rot || 0) + wob, tape: true, torn: true }, o)); ctx.restore(); };
  // ---------- sticky-note callout with a hand-drawn arrow ----------
  X.note = (ctx, text, x, y, tx, ty, k = 1, o = {}) => { if (k <= 0) return; const lines = String(text).split('\n'); ctx.save(); ctx.font = `700 ${o.size || 20}px Fredoka`; const w = Math.max(...lines.map(l => ctx.measureText(l).width)) + 34, h = lines.length * (o.size || 20) * 1.25 + 24;
    if (tx != null) { const a = clamp((k - .3) / .7); if (a > 0) C.marker(ctx, 'arrow', [x, y + (ty > y ? h / 2 : -h / 2), lerp(x, tx, a), lerp(y, ty, a), o.bend ?? 40], 1, o.arrowCol || '#d8241a', 6); }
    const s = ease.back(clamp(k / .5)); ctx.translate(x, y); ctx.rotate(o.rot ?? -.04); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-w / 2 + 5, -h / 2 + 7, w, h); ctx.fillStyle = o.bg || '#ffe680'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = 'rgba(0,0,0,.06)'; ctx.fillRect(-w / 2, -h / 2, w, 10);
    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; lines.forEach((l, i) => ctx.fillText(l, 0, -h / 2 + 12 + (o.size || 20) * .62 + i * (o.size || 20) * 1.25)); ctx.restore(); };
  // ---------- the 1770s desk that replaces the plain kraft board ----------
  const deskStatic = () => C.off('usa-desk', 1280, 720, (c) => { const g = c.createLinearGradient(0, 0, 1280, 720); g.addColorStop(0, '#6a4428'); g.addColorStop(1, '#4a2c18'); c.fillStyle = g; c.fillRect(0, 0, 1280, 720); const R = rng(7);
      for (let y = 0; y < 720; y += 90) { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(0, y, 1280, 3); c.strokeStyle = 'rgba(255,220,170,.06)'; c.lineWidth = 2; for (let i = 0; i < 9; i++) { const yy = y + 10 + i * 9; c.beginPath(); c.moveTo(0, yy); for (let x = 0; x <= 1280; x += 40) c.lineTo(x, yy + Math.sin(x * .01 + i + y) * 3); c.stroke(); } }
      // a map corner, top left; letters, bottom right; a ledger strip, top right
      c.save(); c.translate(-30, -40); c.rotate(-.12); c.fillStyle = '#e8d8b0'; c.fillRect(0, 0, 330, 230); c.strokeStyle = 'rgba(90,60,30,.6)'; c.lineWidth = 2; for (let i = 0; i < 7; i++) { c.beginPath(); c.moveTo(20, 30 + i * 28); c.bezierCurveTo(90, 10 + i * 30, 180, 60 + i * 24, 320, 40 + i * 26); c.stroke(); } c.fillStyle = 'rgba(70,110,150,.35)'; c.beginPath(); c.moveTo(200, 0); c.bezierCurveTo(230, 80, 180, 150, 260, 230); c.lineTo(330, 230); c.lineTo(330, 0); c.fill(); c.restore();
      c.save(); c.translate(1100, 600); c.rotate(.18); for (let j = 0; j < 3; j++) { c.fillStyle = ['#f0e4c8', '#e8dab8', '#f4ead4'][j]; c.fillRect(-150 + j * 14, -100 + j * 12, 300, 200); c.strokeStyle = 'rgba(60,40,20,.35)'; c.lineWidth = 1.5; for (let i = 0; i < 8; i++) { c.beginPath(); c.moveTo(-130 + j * 14, -80 + j * 12 + i * 20); c.lineTo(120 + j * 14 - (i % 3) * 30, -80 + j * 12 + i * 20); c.stroke(); } } c.fillStyle = '#a8241a'; c.beginPath(); c.arc(30, 70, 22, 0, 7); c.fill(); c.restore();
      c.save(); c.translate(1150, 60); c.rotate(.08); c.fillStyle = '#efe2c4'; c.fillRect(-170, -70, 340, 140); c.strokeStyle = 'rgba(160,60,50,.4)'; c.beginPath(); c.moveTo(80, -70); c.lineTo(80, 70); c.stroke(); c.restore();
      // coins, bottom left
      for (let i = 0; i < 7; i++) { const x = 70 + R() * 160, y = 600 + R() * 90, r = 20 + R() * 6; c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.arc(x + 3, y + 4, r, 0, 7); c.fill(); const cg = c.createRadialGradient(x - 6, y - 6, 2, x, y, r); cg.addColorStop(0, i % 3 ? '#f0d070' : '#e8a070'); cg.addColorStop(1, i % 3 ? '#a87a20' : '#8a4a20'); c.fillStyle = cg; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.strokeStyle = 'rgba(80,50,10,.7)'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * .78, 0, 7); c.stroke(); }
      // inkwell + quill, left middle
      c.save(); c.translate(80, 330); c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.arc(6, 8, 46, 0, 7); c.fill(); c.fillStyle = '#1e2430'; c.beginPath(); c.arc(0, 0, 46, 0, 7); c.fill(); c.fillStyle = '#0a0c12'; c.beginPath(); c.arc(0, 0, 24, 0, 7); c.fill(); c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 4; c.beginPath(); c.arc(-8, -8, 34, 3.6, 4.6); c.stroke();
      c.rotate(-.9); c.fillStyle = '#f4f0e8'; c.beginPath(); c.moveTo(0, -10); c.bezierCurveTo(40, -60, 160, -70, 230, -30); c.bezierCurveTo(160, -40, 60, -10, 0, 0); c.fill(); c.strokeStyle = '#c8c0b0'; c.lineWidth = 2; for (let i = 0; i < 14; i++) { c.beginPath(); c.moveTo(20 + i * 14, -12 - i * 2); c.lineTo(30 + i * 14, -40 - (i % 4) * 4); c.stroke(); } c.strokeStyle = '#8a7a60'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -4); c.lineTo(230, -30); c.stroke(); c.restore();
      // sealing wax stick + seal, right middle
      c.save(); c.translate(1210, 380); c.rotate(1.2); c.fillStyle = '#b82a1e'; c.fillRect(-70, -9, 140, 18); c.fillStyle = '#e8d8a8'; c.fillRect(70, -9, 14, 18); c.restore();
      const v = c.createRadialGradient(640, 360, 300, 640, 360, 820); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.45)'); c.fillStyle = v; c.fillRect(0, 0, 1280, 720); });
  X.desk = (ctx) => { const t = G.__frameT || 0; ctx.drawImage(deskStatic(), 0, 0);
    if (IMG('musket')) C.photo(ctx, 'musket', 300, 690, 340, 120, { crop: [.02, .25, .96, .5], rot: .05, border: 6, torn: true, tape: false, seed: 3 });
    if (IMG('powderhorn')) C.photo(ctx, 'powderhorn', 1080, 250, 210, 120, { crop: [.3, .05, .7, .9], rot: -.12, border: 6, torn: true, tape: true, seed: 5 });
    // candle glow, top-left of centre
    const fl = 1 + Math.sin(t * 9) * .05 + Math.sin(t * 23) * .03; const g = ctx.createRadialGradient(170, 170, 10, 170, 170, 420 * fl); g.addColorStop(0, 'rgba(255,200,120,.28)'); g.addColorStop(1, 'rgba(255,200,120,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1280, 720);
    ctx.save(); ctx.translate(170, 170); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.arc(5, 6, 44, 0, 7); ctx.fill(); ctx.fillStyle = '#c8a050'; ctx.beginPath(); ctx.arc(0, 0, 44, 0, 7); ctx.fill(); ctx.fillStyle = '#f4ead0'; ctx.beginPath(); ctx.arc(0, 0, 20, 0, 7); ctx.fill(); ctx.fillStyle = `rgba(255,${200 + Math.sin(t * 13) * 30 | 0},90,.95)`; ctx.beginPath(); ctx.ellipse(Math.sin(t * 7) * 2, 0, 7 * fl, 7 * fl, 0, 0, 7); ctx.fill(); ctx.restore(); };
  const bg0 = C.bg; C.bg = (ctx, name) => name === 'kraft' ? X.desk(ctx) : bg0(ctx, name);
  // ---------- transitions on chosen cuts ----------
  // [t, kind, dir]: whip = blurred pan through the cut; smash = punch-in with a white flash; ink = a blot swallows the cut; flash = white pop
  const TRANS = [];
  X.trans = (t, kind, dir = 1) => TRANS.push([t, kind, dir]);
  let snap = null; const copy = (cv) => { if (!snap) { snap = document.createElement('canvas'); snap.width = 1280; snap.height = 720; } const c = snap.getContext('2d'); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, 1280, 720); c.drawImage(cv, 0, 0); return snap; };
  G.drawTransitions = (ctx, t) => { for (const [t0, kind, dir] of TRANS) { const dt = t - t0;
      if (kind === 'whip' && Math.abs(dt) < .2) { const k = 1 - Math.abs(dt) / .2, off = dir * (dt < 0 ? -1 : 1) * k * 260; const s = copy(ctx.canvas); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 1280, 720); for (let i = 0; i < 8; i++) { ctx.globalAlpha = 1 / (i + 1.4); ctx.drawImage(s, off - dir * i * k * 22, 0); } ctx.globalAlpha = 1; ctx.restore(); }
      else if (kind === 'smash' && dt >= 0 && dt < .35) { const u = dt / .35, z = 1 + .22 * (1 - u) * (1 - u); const s = copy(ctx.canvas); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(640, 360); ctx.scale(z, z); ctx.translate(-640, -360); ctx.drawImage(s, 0, 0); ctx.restore(); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(255,255,255,${.55 * (1 - u) * (1 - u)})`; ctx.fillRect(0, 0, 1280, 720); ctx.restore(); }
      else if (kind === 'ink' && Math.abs(dt) < .35) { const k = 1 - Math.abs(dt) / .35, R = rng(Math.round(t0 * 10)); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#120e0c'; ctx.beginPath(); const n = 28; for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2, r = (900 * ease.inOut(k)) * (0.82 + R() * .3); i ? ctx.lineTo(640 + Math.cos(a) * r, 360 + Math.sin(a) * r * .8) : ctx.moveTo(640 + Math.cos(a) * r, 360 + Math.sin(a) * r * .8); } ctx.fill(); for (let i = 0; i < 10; i++) { const a = R() * 7, r = 900 * k * (.9 + R() * .4); ctx.beginPath(); ctx.arc(640 + Math.cos(a) * r, 360 + Math.sin(a) * r * .8, 18 + R() * 30, 0, 7); ctx.fill(); } ctx.restore(); }
      else if (kind === 'flash' && dt >= 0 && dt < .3) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(255,255,255,${.8 * (1 - dt / .3)})`; ctx.fillRect(0, 0, 1280, 720); ctx.restore(); } } };
  X.TRANS = TRANS;
  G.FX = X;
})(window);
