// The Rome series' one recurring character: the hooded, bearded monk from the user's cow-field clip
// (brown pointed hood, big nose, dark full beard, ankle-length robe, rope belt with hanging cords, strap sandals).
// monk(ctx, x, y, s, t, o): feet at (x, y), ~520 px tall at s = 1, faces left (o.dir = 1 faces right).
//   o.pose: 'stand' | 'walk' | 'haul' (hands back on cart poles, walking) | 'pry' (both hands on a crowbar, leaning) | 'point'
//   o.speed: walk cycles per second (default .9); o.look: 'calm' | 'worried' | 'effort'
(function (G) {
  const P = G.Paint, { ink, cel } = P, INK = P.INK;
  const ROBE = '#76503a', ROBE_SH = '#553624', ROBE_LI = '#8e6648', SKIN = '#f2c9a2', SKIN_SH = '#d9a37e', BEARD = '#3c2a1e', ROPE = '#c8a878', SANDAL = '#5a3a26';
  function sandal(ctx, x, y, lift, back) { ctx.save(); ctx.translate(x, y - lift);
    ink(ctx, back ? SKIN_SH : SKIN, c => { c.moveTo(-6, -46); c.lineTo(10, -46); c.lineTo(12, -8); c.lineTo(-8, -8); c.closePath(); }, 3.5);
    ink(ctx, back ? '#4a2e1e' : SANDAL, c => { c.moveTo(-34, -2); c.quadraticCurveTo(-36, -12, -24, -12); c.lineTo(16, -12); c.quadraticCurveTo(22, -10, 20, 0); c.closePath(); }, 3.5);
    ink(ctx, back ? SKIN_SH : SKIN, c => { c.moveTo(-30, -12); c.quadraticCurveTo(-28, -26, -10, -26); c.lineTo(12, -24); c.lineTo(14, -12); c.closePath(); }, 3);
    ctx.strokeStyle = back ? '#3a2416' : SANDAL; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (const sx of [-18, -2]) { ctx.beginPath(); ctx.moveTo(sx - 4, -12); ctx.lineTo(sx + 6, -26); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-4, -36); ctx.lineTo(12, -32); ctx.stroke();
    ctx.restore(); }
  function hand(ctx, x, y, r = 15) { ink(ctx, SKIN, c => c.ellipse(x, y, r, r * .9, 0, 0, 7), 3.5); ctx.strokeStyle = 'rgba(120,70,50,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - r * .5, y - r * .1); ctx.lineTo(x + r * .4, y - r * .1); ctx.stroke(); }
  function sleeve(ctx, sx, sy, hx, hy, w = 34) { const a = Math.atan2(hy - sy, hx - sx), nx = -Math.sin(a), ny = Math.cos(a);
    cel(ctx, c => { c.moveTo(sx + nx * w * .5, sy + ny * w * .5); c.lineTo(hx + nx * w * .8 - Math.cos(a) * 8, hy + ny * w * .8 - Math.sin(a) * 8); c.lineTo(hx - nx * w * .8 - Math.cos(a) * 8, hy - ny * w * .8 - Math.sin(a) * 8); c.lineTo(sx - nx * w * .5, sy - ny * w * .5); c.closePath(); }, ROBE, { shade: ROBE_SH, dx: 6, dy: 4, lw: 4 }); }
  function monk(ctx, x, y, s, t, o = {}) {
    const pose = o.pose || 'stand', moving = pose === 'walk' || pose === 'haul', ph = moving ? t * Math.PI * 2 * (o.speed ?? .9) : 0;
    const sw = moving ? Math.sin(ph) : 0, bob = moving ? Math.abs(Math.cos(ph)) * 6 : Math.sin(t * 1.6) * 1.5, lean = pose === 'pry' ? -.12 + Math.sin(t * 3) * .03 : pose === 'haul' ? -.06 : 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.dir === 1 ? -1 : 1), s);
    P.contact(ctx, 0, 0, 170, .4);
    // legs and sandals (back one first); a stride swings them about the hips, the lifted foot clears the ground
    const fA = sw * 62, fB = -sw * 62, lA = moving ? Math.max(0, -Math.cos(ph)) * 16 : 0, lB = moving ? Math.max(0, Math.cos(ph)) * 16 : 0;
    sandal(ctx, 22 + fB, 0, lB, true);
    ctx.save(); ctx.rotate(lean); ctx.translate(0, -bob);
    // the robe: A-line from the shoulders to the ankles, hem swinging with the stride
    const hs = sw * 14;
    cel(ctx, c => { c.moveTo(-40, -322); c.quadraticCurveTo(-56, -230, -70 + hs, -72); c.quadraticCurveTo(-2, -58 + Math.abs(hs) * .3, 70 + hs, -76); c.quadraticCurveTo(54, -230, 46, -322); c.quadraticCurveTo(4, -338, -40, -322); c.closePath(); }, ROBE, { shade: ROBE_SH, light: ROBE_LI, dx: 16, dy: 0, lw: 5 });
    ctx.strokeStyle = 'rgba(60,34,20,.55)'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (const [x0, x1] of [[-20, -34 + hs], [18, 26 + hs], [44, 62 + hs]]) { ctx.beginPath(); ctx.moveTo(x0, -200); ctx.quadraticCurveTo((x0 + x1) / 2 + 4, -130, x1, -76); ctx.stroke(); }
    // rope belt and knot with two hanging cords
    ink(ctx, ROPE, c => { c.moveTo(-54, -236); c.quadraticCurveTo(0, -224, 54, -238); c.lineTo(55, -224); c.quadraticCurveTo(0, -210, -55, -222); c.closePath(); }, 3.5);
    ink(ctx, ROPE, c => c.ellipse(-46, -226, 11, 9, 0, 0, 7), 3);
    ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.lineCap = 'round'; for (const cx of [-50, -38]) { ctx.beginPath(); ctx.moveTo(cx, -220); ctx.quadraticCurveTo(cx - 4 + sw * 4, -180, cx + sw * 8, -146); ctx.stroke(); }
    ctx.strokeStyle = ROPE; ctx.lineWidth = 5; for (const cx of [-50, -38]) { ctx.beginPath(); ctx.moveTo(cx, -220); ctx.quadraticCurveTo(cx - 4 + sw * 4, -180, cx + sw * 8, -146); ctx.stroke(); }
    // the back arm (behind the body for haul/pry, hidden otherwise)
    const arm = { stand: [[-6, -300], [-18, -196]], walk: [[-6, -300], [-24 - sw * 22, -200]], haul: [[-4, -300], [30, -196]], pry: [[-20, -296], [-108, -232]], point: [[-20, -300], [-122, -318]] }[pose];
    if (pose === 'pry') { sleeve(ctx, 10, -300, -86, -246, 30); hand(ctx, -88, -246, 14); }
    // the hood's cowl over the shoulders, then the head inside the hood
    cel(ctx, c => { c.moveTo(-50, -328); c.quadraticCurveTo(-62, -292, -34, -272); c.quadraticCurveTo(10, -262, 48, -278); c.quadraticCurveTo(68, -300, 52, -336); c.closePath(); }, ROBE, { shade: ROBE_SH, light: ROBE_LI, dx: 12, dy: 6, lw: 5 });
    ctx.save(); ctx.translate(-6, -330); ctx.rotate(pose === 'pry' ? -.08 : 0);
    // hood: rounded crown, pointed tip trailing back
    cel(ctx, c => { c.moveTo(-74, 2); c.quadraticCurveTo(-92, -100, -20, -150); c.quadraticCurveTo(40, -170, 76, -138); c.lineTo(108, -96 + sw * 2); c.quadraticCurveTo(86, -96, 70, -88); c.quadraticCurveTo(86, -40, 62, 6); c.quadraticCurveTo(-6, 22, -74, 2); c.closePath(); }, ROBE, { shade: ROBE_SH, light: ROBE_LI, dx: 14, dy: 4, lw: 5 });
    // the face opening: dark inside of the hood, then skin
    ink(ctx, '#3a2418', c => { c.moveTo(-70, -6); c.quadraticCurveTo(-82, -88, -30, -120); c.quadraticCurveTo(20, -126, 26, -60); c.quadraticCurveTo(24, -10, -10, 4); c.closePath(); }, 0);
    cel(ctx, c => { c.moveTo(-66, -40); c.quadraticCurveTo(-70, -100, -32, -112); c.quadraticCurveTo(12, -114, 16, -60); c.quadraticCurveTo(14, -20, -20, -6); c.closePath(); }, SKIN, { shade: SKIN_SH, dx: 10, dy: 0, lw: 3.5 });
    // hair fringe under the hood edge
    ink(ctx, BEARD, c => { c.moveTo(-64, -84); c.quadraticCurveTo(-62, -116, -24, -116); c.quadraticCurveTo(12, -114, 16, -86); c.quadraticCurveTo(4, -96, -8, -90); c.quadraticCurveTo(-18, -100, -30, -92); c.quadraticCurveTo(-44, -102, -52, -90); c.quadraticCurveTo(-58, -94, -64, -84); c.closePath(); }, 3);
    // big round nose, eye, brow (worried brows tilt up in the middle)
    ink(ctx, SKIN, c => { c.moveTo(-62, -76); c.quadraticCurveTo(-90, -78, -88, -58); c.quadraticCurveTo(-84, -44, -64, -50); }, 3.5);
    const look = o.look || 'calm', blink = (t * .37 + (o.seed || 0) + .5) % 1 < .04;
    if (blink) { ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-50, -72); ctx.lineTo(-38, -72); ctx.stroke(); }
    else { ink(ctx, '#fffaf0', c => c.ellipse(-44, -72, 7, 9, 0, 0, 7), 2.5); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-47, -71, 4, 0, 7); ctx.fill(); }
    ctx.strokeStyle = BEARD; ctx.lineWidth = 5; ctx.beginPath(); if (look === 'worried') { ctx.moveTo(-56, -84); ctx.lineTo(-32, -92); } else if (look === 'effort') { ctx.moveTo(-56, -92); ctx.lineTo(-32, -82); } else { ctx.moveTo(-56, -88); ctx.quadraticCurveTo(-44, -94, -32, -88); } ctx.stroke();
    // full dark beard from the cheek to the chest, with a little frowning mouth
    cel(ctx, c => { c.moveTo(-68, -46); c.quadraticCurveTo(-74, -4, -50, 26); c.lineTo(-44, 16); c.lineTo(-36, 32); c.lineTo(-26, 18); c.lineTo(-14, 30); c.lineTo(-6, 12); c.quadraticCurveTo(14, -10, 14, -46); c.quadraticCurveTo(-4, -30, -20, -40); c.quadraticCurveTo(-48, -50, -68, -46); c.closePath(); }, BEARD, { shade: '#2a1c12', light: '#5a4030', dx: 8, dy: 0, lw: 3.5 });
    ctx.strokeStyle = '#a86a50'; ctx.lineWidth = 3; ctx.beginPath(); if (look === 'effort') { ctx.moveTo(-62, -30); ctx.lineTo(-46, -30); } else { ctx.moveTo(-62, -28); ctx.quadraticCurveTo(-54, -34, -46, -28); } ctx.stroke();
    ctx.restore();
    // the front arm
    if (pose === 'haul') { sleeve(ctx, -2, -300, 18, -196, 36); hand(ctx, 20, -192, 16); }
    else if (pose === 'pry') { sleeve(ctx, -10, -296, -108, -226, 36); hand(ctx, -110, -228, 16); }
    else { const [[sx, sy], [hx, hy]] = arm; sleeve(ctx, sx, sy, hx, hy, 36); hand(ctx, hx, hy + 4, 16); }
    ctx.restore();
    sandal(ctx, -22 + fA, 0, lA, false);
    ctx.restore(); }
  P.monk = monk;
})(window);
