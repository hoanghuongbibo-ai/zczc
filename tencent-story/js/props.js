/* Extra print-collage props for the full piece. Mask-drawing helpers draw ink
 * density into a halftone mask (alpha = ink); overlay helpers draw finished
 * pasted-paper items straight onto the frame. All shapes are original. */
(function (G) {
  'use strict';
  const C = G.Collage, P = G.Print, { INK } = P;

  // ---------- mask helpers (draw with alpha as ink density) ----------
  const M = {
    // Old CRT monitor with a chat window on screen.
    monitor(g, x, y, s, o = {}) {
      g.save(); g.translate(x, y); g.scale(s, s);
      g.fillStyle = 'rgba(0,0,0,.55)'; g.fillRect(-150, -120, 300, 230);           // case
      g.fillStyle = 'rgba(0,0,0,.8)'; g.fillRect(-60, 110, 120, 22); g.fillRect(-110, 132, 220, 18); // stand
      g.globalCompositeOperation = 'destination-out'; g.fillRect(-125, -98, 250, 180); // screen glass
      g.globalCompositeOperation = 'source-over';
      g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(-125, -98, 250, 180);
      g.fillStyle = 'rgba(0,0,0,.9)'; g.fillRect(-125, -98, 250, 22);                // title bar
      g.fillStyle = 'rgba(0,0,0,.55)';                                              // chat bubbles
      bubble(g, -100, -60, 120, 30); bubble(g, -10, -14, 120, 30); bubble(g, -100, 32, 90, 30);
      g.restore();
    },
    globe(g, x, y, r) {
      g.save(); g.translate(x, y);
      const grd = g.createRadialGradient(-r * .35, -r * .35, r * .1, 0, 0, r);
      grd.addColorStop(0, 'rgba(0,0,0,.15)'); grd.addColorStop(1, 'rgba(0,0,0,.75)');
      g.fillStyle = grd; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
      g.strokeStyle = 'rgba(0,0,0,.9)'; g.lineWidth = 3;
      for (let i = -2; i <= 2; i++) { g.beginPath(); g.ellipse(0, 0, r * Math.abs(i) / 2.6 + 1, r, 0, 0, 7); g.stroke(); }
      for (let j = -2; j <= 2; j++) { const yy = j * r / 3, w = Math.sqrt(r * r - yy * yy); g.beginPath(); g.moveTo(-w, yy); g.lineTo(w, yy); g.stroke(); }
      g.restore();
    },
    pie(g, x, y, r, frac) {
      g.save(); g.translate(x, y);
      g.fillStyle = 'rgba(0,0,0,.3)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
      g.fillStyle = 'rgba(0,0,0,.95)'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, r, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2); g.closePath(); g.fill();
      g.restore();
    },
    burst(g, x, y, r, n = 18) {
      g.save(); g.translate(x, y);
      for (let i = 0; i < n; i++) {
        const a = i / n * Math.PI * 2;
        g.fillStyle = `rgba(0,0,0,${i % 2 ? .25 : .7})`;
        g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, r, a, a + Math.PI * 2 / n); g.closePath(); g.fill();
      }
      g.restore();
    },
    pentagon(g, x, y, r, inner) {
      g.save(); g.translate(x, y);
      const pts = k => { g.beginPath(); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5; g[i ? 'lineTo' : 'moveTo'](Math.cos(a) * k, Math.sin(a) * k); } g.closePath(); };
      g.fillStyle = 'rgba(0,0,0,.85)'; pts(r); g.fill();
      g.globalCompositeOperation = 'destination-out'; pts(r * .78); g.fill();
      g.globalCompositeOperation = 'source-over'; g.fillStyle = 'rgba(0,0,0,.35)'; pts(r * .78); g.fill();
      if (inner) { g.globalCompositeOperation = 'destination-out'; pts(r * .4); g.fill(); }
      g.restore();
    },
    gamepad(g, x, y, s) {
      g.save(); g.translate(x, y); g.scale(s, s);
      g.fillStyle = 'rgba(0,0,0,.85)';
      P.smooth(g, [[-150, -40], [-60, -55], [60, -55], [150, -40], [175, 40], [150, 95], [95, 80], [55, 30], [-55, 30], [-95, 80], [-150, 95], [-175, 40]]); g.fill();
      g.globalCompositeOperation = 'destination-out';
      g.fillRect(-120, -12, 60, 18); g.fillRect(-99, -33, 18, 60);
      for (const [bx, by] of [[95, -20], [125, 5], [95, 30], [65, 5]]) { g.beginPath(); g.arc(bx, by, 11, 0, 7); g.fill(); }
      g.restore();
    },
    // Mitten-like hand gripping a rope, pointing right (flip for left).
    hand(g, x, y, s, flip) {
      g.save(); g.translate(x, y); g.scale(flip ? -s : s, s);
      g.fillStyle = 'rgba(0,0,0,.5)'; g.fillRect(-420, -45, 340, 90); // sleeve
      g.fillStyle = 'rgba(0,0,0,.9)'; g.fillRect(-110, -55, 40, 110);  // cuff
      g.fillStyle = 'rgba(0,0,0,.42)';
      P.smooth(g, [[-75, -45], [0, -60], [50, -48], [72, -20], [70, 18], [40, 46], [-20, 52], [-75, 44]]); g.fill();
      g.strokeStyle = 'rgba(0,0,0,.8)'; g.lineWidth = 4;
      for (const k of [-24, -6, 12, 30]) { g.beginPath(); g.moveTo(20, k); g.lineTo(66, k + 4); g.stroke(); }
      g.restore();
    },
    scissors(g, x, y, s, open = .3) {
      g.save(); g.translate(x, y); g.scale(s, s);
      for (const sgn of [-1, 1]) {
        g.save(); g.rotate(sgn * open);
        g.fillStyle = 'rgba(0,0,0,.9)';
        g.beginPath(); g.moveTo(0, -6 * sgn); g.lineTo(230, -2 * sgn); g.lineTo(0, 10 * sgn); g.closePath(); g.fill();
        g.lineWidth = 16; g.strokeStyle = 'rgba(0,0,0,.9)'; g.beginPath(); g.ellipse(-70, 30 * sgn, 50, 32, 0, 0, 7); g.stroke();
        g.restore();
      }
      g.restore();
    },
  };
  function bubble(g, x, y, w, h) { g.beginPath(); g.roundRect(x, y, w, h, 10); g.fill(); }

  // ---------- overlay helpers (finished paper items) ----------
  function paperRect(ctx, w, h, color, seed) {
    const r = C.rng(seed);
    const p = [[-w / 2 + r() * 5, -h / 2 + r() * 4], [w / 2 - r() * 5, -h / 2 + r() * 4], [w / 2 - r() * 5, h / 2 - r() * 4], [-w / 2 + r() * 5, h / 2 - r() * 4]];
    ctx.save(); ctx.translate(5, 7); C.pathPts(ctx, p); ctx.fillStyle = 'rgba(20,12,5,0.35)'; ctx.fill(); ctx.restore();
    C.pathPts(ctx, p); ctx.fillStyle = color; ctx.fill();
    ctx.save(); ctx.clip(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .5; ctx.fillStyle = P.textureOf(ctx); ctx.fillRect(-w, -h, w * 2, h * 2); ctx.restore();
    return p;
  }
  function pasted(ctx, lt, x, y, rot, fn) { // hard 2-frame slap, like the strips
    if (lt < 0) return;
    const slap = lt < .07 ? 1.06 : 1;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(slap, slap); fn(ctx); ctx.restore();
  }
  const O = {
    block(ctx, lt, x, y, w, h, o = {}) {
      pasted(ctx, lt, x, y, o.rot || 0, c => { paperRect(c, w, h, o.color || INK.red, o.seed || 5); if (o.draw) o.draw(c); });
    },
    text(c, s, x, y, font, color, align = 'center') {
      c.font = font; c.fillStyle = color; c.textAlign = align; c.textBaseline = 'middle'; c.fillText(s, x, y);
    },
    cheque(ctx, lt, x, y, payee, amount, o = {}) {
      pasted(ctx, lt, x, y, o.rot ?? -.05, c => {
        paperRect(c, 560, 230, '#e6e2c4', o.seed || 81);
        c.strokeStyle = 'rgba(63,127,122,.6)'; c.lineWidth = 1;
        for (let yy = -100; yy < 110; yy += 8) { c.beginPath(); c.moveTo(-270, yy); c.lineTo(270, yy); c.stroke(); } // safety pattern
        const mono = 'bold 22px "DejaVu Sans Mono"';
        O.text(c, 'PAY TO THE ORDER OF', -255, -62, '14px "DejaVu Sans Mono"', INK.black, 'left');
        O.text(c, payee, -255, -28, mono, INK.black, 'left');
        c.strokeStyle = INK.black; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-255, -12); c.lineTo(120, -12); c.stroke();
        c.strokeRect(140, -50, 120, 44);
        O.text(c, amount, 200, -27, 'bold 24px "DejaVu Serif"', INK.black);
        O.text(c, o.year || '', 250, -88, '16px "DejaVu Sans Mono"', INK.black, 'right');
        c.beginPath(); c.moveTo(40, 70); c.bezierCurveTo(80, 40, 110, 95, 150, 60); c.bezierCurveTo(180, 40, 200, 80, 240, 64); c.stroke(); // signature squiggle
        O.text(c, 'MEMO: stake', -255, 70, '15px "DejaVu Sans Mono"', INK.black, 'left');
      });
    },
    box(ctx, lt, x, y, name, color, o = {}) { // a game box with only its own name on it
      pasted(ctx, lt, x, y, o.rot || 0, c => {
        paperRect(c, 300, 400, color, o.seed || 91);
        c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(-150, 120, 300, 80);
        O.text(c, name, 0, -20, o.font || 'bold 64px "DejaVu Serif"', o.fg || INK.cream);
        c.strokeStyle = o.fg || INK.cream; c.lineWidth = 3; c.strokeRect(-128, -178, 256, 300);
        O.text(c, 'STUDIO', 0, 160, 'bold 22px "DejaVu Sans Mono"', o.fg || INK.cream);
      });
    },
    tag(ctx, lt, x, y, name, o = {}) { // name tag hanging on a string from the top
      if (lt < 0) return;
      const sw = Math.sin(C.E.t * 2.2 + (o.seed || 0)) * .05;
      ctx.save(); ctx.translate(x, o.top ?? -10); ctx.rotate(sw);
      ctx.strokeStyle = INK.black; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, y - (o.top ?? -10) - 30); ctx.stroke();
      ctx.translate(0, y - (o.top ?? -10));
      P.strip(ctx, name, 0, 0, { lt, size: o.size || 40, font: o.font || 'bold 40px "DejaVu Serif"', bg: o.bg || INK.cream, fg: o.fg || INK.black, rot: o.rot || 0, seed: o.seed || 4, squash: .85 });
      ctx.restore();
    },
    stampRed(ctx, lt, text, x, y, o = {}) { C.stamp(ctx, text, x, y, C.clamp(lt / .2), { size: o.size || 52, rot: o.rot ?? -.15, color: o.color || INK.red }); },
    // Line chart that draws itself from k=0..1 (points in screen space).
    chart(ctx, pts, k, o = {}) {
      if (k <= 0) return;
      const n = pts.length - 1, upto = k * n, i0 = Math.floor(upto);
      ctx.save(); ctx.strokeStyle = o.color || INK.red; ctx.lineWidth = o.width || 10; ctx.lineCap = ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i <= i0; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      if (i0 < n) { const f = upto - i0, a = pts[i0], b = pts[i0 + 1]; ctx.lineTo(C.lerp(a[0], b[0], f), C.lerp(a[1], b[1], f)); }
      ctx.stroke(); ctx.restore();
    },
  };

  G.Props = { M, O, paperRect, pasted };
})(window);
