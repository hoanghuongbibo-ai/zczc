/* Shared drawing kit for the channel thumbnails: thick-ink flat shapes, the bubbly title,
 * the red badge, white round-headed characters and the final colour grade.
 * Usage: const T = Toon(canvas); then T.ink(path, fill), T.title(...), ... */
function Toon(c, seed0 = 7) {
  const g = c.getContext('2d'), W = c.width, H = c.height, INK = '#1b1410';
  let seed = seed0; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const P = f => { g.beginPath(); f(g); };
  function ink(path, fill, lw = 7) {
    g.lineJoin = 'round'; g.lineCap = 'round';
    P(path); if (lw) { g.lineWidth = lw * 2; g.strokeStyle = INK; g.stroke(); }
    if (fill) { P(path); g.fillStyle = fill; g.fill(); }
  }
  function line(pts, w = 6, col = INK) {
    g.beginPath(); g.moveTo(...pts[0]);
    if (pts.length === 3) g.quadraticCurveTo(...pts[1], ...pts[2]); else pts.slice(1).forEach(p => g.lineTo(...p));
    g.lineWidth = w; g.strokeStyle = col; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke();
  }
  const ell = (x, y, rx, ry, r = 0) => c => c.ellipse(x, y, rx, ry, r, 0, Math.PI * 2);
  const rr = (x, y, w, h, r) => c => c.roundRect(x, y, w, h, r);
  const lg = (x0, y0, x1, y1, stops) => { const gr = g.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, col]) => gr.addColorStop(o, col)); return gr; };
  const rg = (x, y, r0, r1, stops) => { const gr = g.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([o, col]) => gr.addColorStop(o, col)); return gr; };
  const fill = (path, col) => { P(path); g.fillStyle = col; g.fill(); };

  // Big bubbly title: hard drop shadow, thick ink outline, highlight band on the top half.
  function title(text, x, y, size, col, rot = 0, align = 'left') {
    g.save(); g.translate(x, y); g.rotate(rot);
    g.font = `${size}px Lucky`; g.textBaseline = 'alphabetic'; g.textAlign = align; g.lineJoin = 'round';
    g.fillStyle = INK; g.strokeStyle = INK; g.lineWidth = size * .24;
    g.strokeText(text, 10, 16); g.fillText(text, 10, 16);
    g.lineWidth = size * .2; g.strokeText(text, 0, 0);
    g.fillStyle = col; g.fillText(text, 0, 0);
    g.save(); g.beginPath(); g.rect(-3000, -size, 6000, size * .42); g.clip();
    g.fillStyle = 'rgba(255,255,255,.35)'; g.fillText(text, 0, 0); g.restore();
    g.restore();
  }
  const yellow = size => lg(0, -size, 0, 0, [[0, '#fff36a'], [1, '#ffc21a']]);
  // Red stitched badge; width fits the text.
  function badge(text, x, y, size = 56, rot = -.04, col = '#d6281e') {
    g.save(); g.translate(x, y); g.rotate(rot);
    g.font = `${size}px Lucky`; const w = g.measureText(text).width + size * 1.1, h = size * 1.85;
    ink(rr(-w / 2, -h / 2, w, h, 20), col, 7);
    g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 4; g.setLineDash([12, 9]); P(rr(-w / 2 + 13, -h / 2 + 12, w - 26, h - 24, 14)); g.stroke(); g.setLineDash([]);
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#fff'; g.fillText(text, 0, size * .12);
    g.restore();
  }
  // White bean head, r ≈ half-width. Shading on the right side. Returns nothing; draw face after.
  function head(hx, hy, r, shade = 'rgba(200,190,175,.45)') {
    const k = r / 170;
    const path = c => { c.moveTo(hx - 175 * k, hy); c.bezierCurveTo(hx - 180 * k, hy - 195 * k, hx + 180 * k, hy - 195 * k, hx + 178 * k, hy); c.bezierCurveTo(hx + 176 * k, hy + 150 * k, hx + 90 * k, hy + 185 * k, hx, hy + 185 * k); c.bezierCurveTo(hx - 95 * k, hy + 185 * k, hx - 172 * k, hy + 150 * k, hx - 175 * k, hy); c.closePath(); };
    ink(path, '#fbf7ef', 8);
    fill(c => { c.moveTo(hx + 120 * k, hy - 60 * k); c.bezierCurveTo(hx + 190 * k, hy + 30 * k, hx + 150 * k, hy + 170 * k, hx + 30 * k, hy + 182 * k); c.bezierCurveTo(hx + 120 * k, hy + 140 * k, hx + 160 * k, hy + 40 * k, hx + 120 * k, hy - 60 * k); }, shade);
  }
  const eye = (x, y, rx, ry, px = 0, py = 0, pr = .3) => { ink(ell(x, y, rx, ry), '#ffffff', 5); fill(ell(x + px, y + py, rx * pr, ry * pr), INK); };
  const drop = (x, y, s, col = '#7fd0ff') => ink(c => { c.moveTo(x, y - 30 * s); c.bezierCurveTo(x + 20 * s, y, x + 16 * s, y + 18 * s, x, y + 18 * s); c.bezierCurveTo(x - 16 * s, y + 18 * s, x - 20 * s, y, x, y - 30 * s); c.closePath(); }, col, 4);
  // Gondolier's straw boater with red ribbon.
  function boater(x, y, s, rot) {
    g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
    ink(ell(0, 0, 120, 26), '#f1d27a', 6);
    ink(c => { c.moveTo(-70, 0); c.lineTo(-64, -62); c.quadraticCurveTo(0, -76, 64, -62); c.lineTo(70, 0); c.closePath(); }, '#f1d27a', 6);
    ink(rr(-67, -30, 134, 22, 4), '#c7322a', 4);
    for (let k = -3; k <= 3; k++) line([[k * 30, -6], [k * 30 + 8, 8]], 2.5, 'rgba(140,100,30,.5)');
    g.restore();
  }
  // Striped gondolier shirt clipped to a torso path.
  function stripes(path, x0, y0, w, h, step = 34) {
    ink(path, '#fbf7ef', 7);
    g.save(); P(path); g.clip();
    for (let y = y0; y < y0 + h; y += step) { g.fillStyle = '#1e2a52'; g.fillRect(x0, y, w, step / 2); }
    g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(x0 + w * .75, y0, w * .3, h);
    g.restore();
  }
  function grade(vig = 'rgba(30,15,5,.55)') {
    g.fillStyle = rg(W / 2, H / 2, 350, 1200, [[0, 'rgba(0,0,0,0)'], [1, vig]]); g.fillRect(0, 0, W, H);
    const img = g.getImageData(0, 0, W, H), d = img.data;
    for (let i = 0; i < d.length; i += 4) { const n = (rnd() - .5) * 14; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
    g.putImageData(img, 0, 0);
  }
  return { g, W, H, INK, rnd, P, ink, line, ell, rr, lg, rg, fill, title, yellow, badge, head, eye, drop, boater, stripes, grade };
}
