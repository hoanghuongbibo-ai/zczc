/* Round-head cartoon people for the comedy-history style: big white round head with a grey shading crescent,
 * tiny expressive features, small costume body, mitten hands, stubby legs. 1770s costumes for the Revolution
 * video (Continental, militia, redcoat, Hessian, civilian), plus silhouettes for night crowds.
 * person(ctx, x, y, s, o) — (x, y) is between the feet; s = scale (1 ≈ 300 px tall with a hat). */
(function (G) {
  'use strict';
  const T = G.Toon, K = G.Kit, INK = K.INK;
  const sh = K.sh;
  const HEAD_Y = -178, R = 52;

  // ---------- costumes ----------
  const COSTUME = {
    you:         { coat: '#7d5b3d', coat2: '#654830', trousers: '#cfc09d', feet: 'rags', hat: 'tricorne', hair: '#6b4a2e', blanket: '#8e897c', ragged: true },
    continental: { coat: '#2f4c7d', coat2: '#253d66', facing: '#d8c08a', trousers: '#e9e2cf', feet: 'shoes', hat: 'tricorne', hair: '#5b4636', buttons: '#e8d07a' },
    militia:     { coat: '#7a6a45', coat2: '#655838', trousers: '#b8a888', feet: 'shoes', hat: 'round', hair: '#4e3a2a', fringe: true },
    redcoat:     { coat: '#c3322c', coat2: '#9e2723', facing: '#2c3f73', trousers: '#ece6d6', feet: 'shoes', hat: 'tricorne', hair: '#d9d2c4', belts: '#f3efe4', buttons: '#e8d07a' },
    grenadier:   { coat: '#c3322c', coat2: '#9e2723', facing: '#2c3f73', trousers: '#ece6d6', feet: 'shoes', hat: 'bearskin', hair: '#d9d2c4', belts: '#f3efe4', buttons: '#e8d07a' },
    hessian:     { coat: '#2b3a63', coat2: '#212d4e', facing: '#b5332c', trousers: '#e3d9b8', feet: 'shoes', hat: 'mitre', hair: '#d9d2c4', belts: '#f3efe4', buttons: '#e8d07a' },
    civilian:    { coat: '#5d6b4c', coat2: '#4c583e', trousers: '#8a7556', feet: 'shoes', hat: 'none', hair: '#5b4636' },
  };

  // ---------- arms (2 segments, mitten hand) ----------
  // Pose targets for the right arm (screen-right side), relative to the shoulder: [elbowX, elbowY, handX, handY].
  const POSE = {
    down: [8, 34, 10, 66], hug: [18, 30, -40, 26], musket: [22, 28, 26, 56], point: [38, 2, 74, -12], up: [30, -24, 34, -66],
    hips: [32, 24, 18, 50], out: [34, 18, 62, 30], chin: [20, 26, -18, -14], cover: [22, 10, -18, -56], hold: [22, 30, 0, 48],
  };
  function arm(ctx, sx, sy, side, pose, sleeve, cuff, t, o) {
    let p = typeof pose === 'string' ? POSE[pose] : pose; if (!p) p = POSE.down;
    const shiver = o.shiver ? Math.sin(t * 55 + side) * 1.6 : 0;
    const e = [sx + side * p[0], sy + p[1]], h = [sx + side * p[2] + shiver, sy + p[3]];
    T.line(ctx, [[sx, sy], e, h], 24, INK); T.line(ctx, [[sx, sy], e, h], 16, sleeve);
    if (cuff) { const dx = h[0] - e[0], dy = h[1] - e[1], L = Math.hypot(dx, dy) || 1; T.line(ctx, [[h[0] - dx / L * 14, h[1] - dy / L * 14], [h[0] - dx / L * 6, h[1] - dy / L * 6]], 16, cuff); }
    // mitten hand: palm + thumb as one outlined shape
    ctx.save(); ctx.translate(h[0], h[1]);
    ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.moveTo(side * 9, -6); ctx.arc(side * 9, -7, 5.5, 0, 7);
    ctx.fillStyle = o.glove || '#fbfaf7'; ctx.fill(); ctx.lineWidth = 3.5; ctx.strokeStyle = INK; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.arc(side * 9, -7, 5.5, 0, 7); ctx.fillStyle = o.glove || '#fbfaf7'; ctx.fill();
    ctx.restore();
    return h;
  }

  // ---------- hats ----------
  function hat(ctx, kind, c, tilt = 0) {
    ctx.save(); ctx.translate(0, HEAD_Y); ctx.rotate(tilt); ctx.translate(0, -HEAD_Y);
    if (kind === 'tricorne') {
      sh(ctx, T.ellipse(0, HEAD_Y - 40, 40, 20), '#2a2522', 4.5);
      sh(ctx, T.smooth([[-74, HEAD_Y - 30], [-44, HEAD_Y - 58], [0, HEAD_Y - 64], [44, HEAD_Y - 58], [74, HEAD_Y - 30], [36, HEAD_Y - 26], [0, HEAD_Y - 12], [-36, HEAD_Y - 26]]), '#2a2522', 4.5);
      T.line(ctx, [[-66, HEAD_Y - 31], [-34, HEAD_Y - 29], [0, HEAD_Y - 17], [34, HEAD_Y - 29], [66, HEAD_Y - 31]], 3, c.tape || '#5a524b');
      if (c.cockade) { sh(ctx, T.circle(-30, HEAD_Y - 36, 8), c.cockade, 2.5); }
      if (c.snow) { ctx.save(); ctx.globalAlpha = c.snow; sh(ctx, T.smooth([[-60, HEAD_Y - 52], [-30, HEAD_Y - 64], [0, HEAD_Y - 69], [30, HEAD_Y - 64], [60, HEAD_Y - 52], [0, HEAD_Y - 58]]), '#eef4f8', 0); ctx.restore(); }
    } else if (kind === 'round') {
      sh(ctx, T.ellipse(0, HEAD_Y - 34, 70, 13), '#3b3128', 4.5);
      sh(ctx, T.rect(-34, HEAD_Y - 74, 68, 42, 14), '#3b3128', 4.5);
      T.line(ctx, [[-33, HEAD_Y - 42], [33, HEAD_Y - 42]], 5, '#5a4a3a');
    } else if (kind === 'cap') {
      sh(ctx, c2 => { c2.arc(0, HEAD_Y - 6, R + 3, Math.PI * 1.03, Math.PI * 1.97); c2.closePath(); }, c.capColor || '#6d4c3a', 4.5);
      T.line(ctx, [[-54, HEAD_Y - 18], [54, HEAD_Y - 18]], 5, 'rgba(0,0,0,.25)');
    } else if (kind === 'bearskin') {
      sh(ctx, T.smooth([[-46, HEAD_Y - 22], [-52, HEAD_Y - 90], [-30, HEAD_Y - 132], [10, HEAD_Y - 142], [44, HEAD_Y - 116], [50, HEAD_Y - 22]]), '#1c1a19', 4.5);
      for (let i = 0; i < 7; i++) T.line(ctx, [[-36 + i * 12, HEAD_Y - 40], [-40 + i * 12, HEAD_Y - 70]], 2, '#3b3734');
      sh(ctx, T.ellipse(0, HEAD_Y - 46, 18, 16), '#d6b45a', 3);
    } else if (kind === 'mitre') {
      sh(ctx, T.poly([[-40, HEAD_Y - 24], [-30, HEAD_Y - 102], [0, HEAD_Y - 128], [30, HEAD_Y - 102], [40, HEAD_Y - 24]]), '#c9a54a', 4.5);
      sh(ctx, T.poly([[-40, HEAD_Y - 24], [40, HEAD_Y - 24], [36, HEAD_Y - 40], [-36, HEAD_Y - 40]]), '#b5332c', 3.5);
      sh(ctx, T.circle(0, HEAD_Y - 132, 8), '#e9e2cf', 3);
      T.line(ctx, [[-14, HEAD_Y - 70], [0, HEAD_Y - 92], [14, HEAD_Y - 70]], 3, '#8a6d2a');
    }
    ctx.restore();
  }

  // ---------- face ----------
  // face = { eyes, brows, mouth, look:[dx,dy] }
  //  eyes: dot | closed (^ ^) | squint (> <) | shock (O O) | line (- -) | sad | tired (half-lid)
  //  brows: none | neutral | worried | angry | up | sad
  //  mouth: flat | smile | frown | open | o | grit (chattering teeth) | wobble | none
  function face(ctx, f = {}, t = 0) {
    const lx = (f.look ? f.look[0] : 0) * 10, ly = (f.look ? f.look[1] : 0) * 6, ey = HEAD_Y - 2 + ly, mx = lx * .8;
    const eyes = f.blink ? 'line' : (f.eyes || 'dot');
    for (const s of [-1, 1]) {
      const x = s * 18 + lx;
      ctx.save();
      if (eyes === 'dot') sh(ctx, T.ellipse(x, ey, 4.5, 6.5), INK, 0);
      else if (eyes === 'closed') T.line(ctx, [[x - 8, ey + 2], [x, ey - 5], [x + 8, ey + 2]], 3.5);
      else if (eyes === 'squint') T.line(ctx, [[x - s * 8, ey - 7], [x + s * 6, ey], [x - s * 8, ey + 7]], 3.5);
      else if (eyes === 'shock') { sh(ctx, T.circle(x, ey, 10), '#fff', 3); sh(ctx, T.circle(x + lx * .2, ey + 1, 3.2), INK, 0); }
      else if (eyes === 'line') T.line(ctx, [[x - 8, ey], [x + 8, ey]], 3.5);
      else if (eyes === 'sad') { sh(ctx, T.ellipse(x, ey + 1, 4.5, 6), INK, 0); }
      else if (eyes === 'tired') { sh(ctx, T.ellipse(x, ey + 2, 4.5, 4.5), INK, 0); T.line(ctx, [[x - 8, ey - 3], [x + 8, ey - 3]], 3); }
      ctx.restore();
      const by = ey - 17, b = f.brows || 'neutral';
      if (b === 'neutral') T.line(ctx, [[x - 8, by], [x + 7, by - 1]], 3.5);
      // inner end = toward the nose (x - s*9); worried lifts it, angry drops it
      else if (b === 'worried' || b === 'sad') T.line(ctx, [[x - s * 9, by - 5], [x + s * 7, by + 2]], 3.5);
      else if (b === 'angry') T.line(ctx, [[x - s * 9, by + 4], [x + s * 7, by - 5]], 4);
      else if (b === 'up') T.line(ctx, [[x - 8, by - 6], [x + 7, by - 8]], 3.5);
    }
    const my = HEAD_Y + 26 + ly, m = f.mouth || 'flat';
    if (m === 'flat') T.line(ctx, [[mx - 8, my], [mx + 8, my]], 3.5);
    else if (m === 'smile') T.line(ctx, [[mx - 10, my - 3], [mx, my + 4], [mx + 10, my - 3]], 3.5);
    else if (m === 'frown') T.line(ctx, [[mx - 10, my + 4], [mx, my - 3], [mx + 10, my + 4]], 3.5);
    else if (m === 'open') { sh(ctx, T.ellipse(mx, my + 3, 10, 12), '#4a2220', 3.5); sh(ctx, T.ellipse(mx, my + 10, 6, 4), '#d2655d', 0); }
    else if (m === 'o') sh(ctx, T.ellipse(mx, my + 2, 5, 6.5), '#4a2220', 3);
    else if (m === 'wobble') T.line(ctx, [[mx - 11, my + 2], [mx - 5, my - 2], [mx, my + 2], [mx + 5, my - 2], [mx + 11, my + 2]], 3);
    else if (m === 'grit') {
      const j = Math.sin(t * 60) > 0 ? 1.5 : -1.5;                       // chattering
      sh(ctx, T.rect(mx - 13, my - 6 + j * .3, 26, 13, 4), '#fff', 3.2); T.line(ctx, [[mx - 12, my + j * .5], [mx + 12, my + j * .5]], 2);
      for (const dx of [-6, 0, 6]) T.line(ctx, [[mx + dx, my - 5], [mx + dx, my + 6]], 1.6);
    }
    if (f.sweat) { const k = (t * .8) % 1; sh(ctx, c => { const x = 44, y = HEAD_Y - 20 + k * 30; c.moveTo(x, y - 9); c.quadraticCurveTo(x + 7, y + 2, x, y + 5); c.quadraticCurveTo(x - 7, y + 2, x, y - 9); }, '#9fd3f2', 2.5); }
  }

  // ---------- the person ----------
  function person(ctx, x, y, s, o = {}) {
    const c = Object.assign({}, COSTUME[o.costume || 'you'], o.colors || {}), t = o.t || 0;
    const bob = o.bob ?? Math.sin(t * 2.1 + x * .01) * 1.5, jit = o.shiver ? Math.sin(t * 47) * 1.4 : 0;
    ctx.save(); ctx.translate(x + jit, y); ctx.scale(s * (o.flip ? -1 : 1), s); if (o.lean) ctx.rotate(o.lean);
    if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    // legs + feet
    const legC = c.trousers;
    for (const side of [-1, 1]) {
      const lift = o.step && side === (o.step > 0 ? 1 : -1) ? Math.abs(o.step) * 8 : 0;
      sh(ctx, T.rect(side * 18 - 11, -50 - lift, 22, 44, 8), legC, 4);
      if (c.feet === 'rags') {
        sh(ctx, T.ellipse(side * 21, -6 - lift, 21, 12), '#a99c88', 4);
        for (let k = 0; k < 3; k++) T.line(ctx, [[side * 21 - 15 + k * 4, -14 + k * 2 - lift], [side * 21 + 5 + k * 6, -1 - k * 1 - lift]], 2.2, '#6f6455');
        T.line(ctx, [[side * 21 - 6, -16 - lift], [side * 21 - 10, -26 - lift]], 3, '#a99c88');
      } else sh(ctx, T.ellipse(side * 22, -6 - lift, 19, 10), '#26211d', 4);
    }
    // torso (coat, flared, optional ragged hem)
    ctx.save(); ctx.translate(0, bob);
    const hem = [];
    if (c.ragged) for (let i = 0; i <= 8; i++) hem.push([46 - i * 11.5, -40 + (i % 2 ? 8 : 0)]); else hem.push([46, -38], [-46, -38]);
    sh(ctx, T.poly([[-34, -128], [34, -128], [46, -40], ...hem.slice(1, -1), [-46, -40]]), c.coat, 4.5);
    sh(ctx, T.poly([[2, -126], [34, -128], [46, -40], [8, -40]]), c.coat2, 0);                // shading half
    T.line(ctx, [[-34, -128], [34, -128], [46, -40]], 4.5);
    if (c.facing) { sh(ctx, T.poly([[-14, -126], [-4, -126], [-6, -60], [-18, -66]]), c.facing, 3); sh(ctx, T.poly([[14, -126], [4, -126], [6, -60], [18, -66]]), c.facing, 3); }
    if (c.belts) { T.line(ctx, [[-30, -122], [36, -48]], 9, INK); T.line(ctx, [[-30, -122], [36, -48]], 6, c.belts); T.line(ctx, [[30, -122], [-36, -48]], 9, INK); T.line(ctx, [[30, -122], [-36, -48]], 6, c.belts); }
    if (c.buttons) for (let i = 0; i < 4; i++) sh(ctx, T.circle(-10, -112 + i * 16, 2.6), c.buttons, 1.5);
    if (c.fringe) for (let i = 0; i < 9; i++) T.line(ctx, [[-30 + i * 7.5, -96], [-31 + i * 7.5, -88]], 2, '#4d4128');
    if (c.blanket && o.blanket !== false) {
      sh(ctx, T.smooth([[-44, -134], [0, -142], [44, -134], [54, -96], [36, -84], [0, -104], [-36, -84], [-54, -96]]), c.blanket, 4.5);
      T.line(ctx, [[-46, -110], [-12, -122]], 4, '#6f6a5f'); T.line(ctx, [[46, -110], [12, -122]], 4, '#6f6a5f');
    }
    if (o.frost) {                                                       // cold creeping up from the feet
      ctx.save(); const g = ctx.createLinearGradient(0, 0, 0, -140); g.addColorStop(0, 'rgba(150,205,240,.75)'); g.addColorStop(Math.min(.99, o.frost), 'rgba(150,205,240,.55)'); g.addColorStop(Math.min(1, o.frost + .01), 'rgba(150,205,240,0)');
      ctx.beginPath(); ctx.moveTo(-34, -128); ctx.lineTo(34, -128); ctx.lineTo(46, -40); ctx.lineTo(-46, -40); ctx.closePath();
      for (const sd of [-1, 1]) { ctx.rect(sd * 18 - 11, -50, 22, 44); ctx.ellipse(sd * 21, -6, 21, 12, 0, 0, 7); }
      ctx.clip(); ctx.fillStyle = g; ctx.fillRect(-60, -150, 120, 150); ctx.restore();
    }
    // musket (behind the right arm)
    if (o.musket === 'shoulder') { ctx.save(); ctx.translate(60, -64); ctx.rotate(.05); sh(ctx, T.rect(-5, -150, 10, 168, 3), '#6a4428', 3.5); sh(ctx, T.rect(-3, -176, 6, 30, 2), '#8c8c8c', 2.5); if (o.bayonet) sh(ctx, T.poly([[-2, -176], [2, -176], [0, -214]]), '#b9bec4', 2.5); ctx.restore(); }
    if (o.musket === 'ready') { ctx.save(); ctx.translate(-6, -86); ctx.rotate(-.75); sh(ctx, T.rect(-6, -10, 170, 11, 3), '#6a4428', 3.5); sh(ctx, T.rect(140, -8, 40, 7, 2), '#8c8c8c', 2.5); ctx.restore(); }
    // head
    ctx.save(); const hb = o.headBob || 0; ctx.translate(0, hb); if (o.headTilt) { ctx.translate(0, HEAD_Y); ctx.rotate(o.headTilt); ctx.translate(0, -HEAD_Y); }
    if (c.hair && c.hat !== 'bearskin' && c.hat !== 'mitre') { sh(ctx, T.ellipse(-44, HEAD_Y - 6, 14, 22, .3), c.hair, 3.5); sh(ctx, T.ellipse(44, HEAD_Y - 6, 14, 22, -.3), c.hair, 3.5); }
    const skin = o.skin || '#fbfaf7';
    ctx.save(); ctx.beginPath(); ctx.arc(0, HEAD_Y, R, 0, 7); ctx.clip();
    ctx.fillStyle = o.shade || '#d4d0ca'; ctx.fillRect(-R, HEAD_Y - R, 2 * R, 2 * R);
    ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(-8, HEAD_Y - 5, R * .94, 0, 7); ctx.fill();
    if (o.frostFace) { ctx.fillStyle = `rgba(170,215,245,${o.frostFace})`; ctx.fillRect(-R, HEAD_Y - R, 2 * R, 2 * R); }
    ctx.restore();
    sh(ctx, T.circle(0, HEAD_Y, R), null, 5);
    if (o.cheeks) { sh(ctx, T.ellipse(-30, HEAD_Y + 14, 9, 5), 'rgba(230,120,120,.45)', 0); sh(ctx, T.ellipse(30, HEAD_Y + 14, 9, 5), 'rgba(230,120,120,.45)', 0); }
    face(ctx, o.face, t);
    if ((o.hat ?? c.hat) !== 'none') hat(ctx, o.hat ?? c.hat, Object.assign({ snow: o.snow }, c), o.hatTilt || 0);
    if (o.shiverMarks) for (const sd of [-1, 1]) { const k = Math.sin(t * 20) * 2; T.line(ctx, [[sd * 66 + k, HEAD_Y - 18], [sd * 74 + k, HEAD_Y - 8], [sd * 66 + k, HEAD_Y + 2], [sd * 74 + k, HEAD_Y + 12]], 3); }
    ctx.restore();
    // arms in front
    const handR = arm(ctx, 32, -120, 1, o.armR || (o.musket === 'shoulder' ? 'musket' : 'down'), c.coat, c.facing, t, o);
    const handL = arm(ctx, -32, -120, -1, o.armL || 'down', c.coat, c.facing, t, o);
    ctx.restore(); ctx.restore();
    return { handR, handL };
  }

  // Night-crowd silhouette: one dark tone, faint rim light, optional hat/musket, tiny dim eyes.
  function silhouette(ctx, x, y, s, o = {}) {
    const col = o.color || '#1b2235', rim = o.rim || 'rgba(255,190,120,.0)';
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    const p = c => { c.moveTo(-46, -36); c.lineTo(-34, -128); c.lineTo(34, -128); c.lineTo(46, -36); c.closePath(); };
    sh(ctx, p, col, 4, '#0b0e17');
    sh(ctx, T.circle(0, HEAD_Y, R), col, 4, '#0b0e17');
    if (o.hat !== 'none') sh(ctx, T.smooth([[-74, HEAD_Y - 30], [-44, HEAD_Y - 58], [0, HEAD_Y - 64], [44, HEAD_Y - 58], [74, HEAD_Y - 30], [0, HEAD_Y - 12]]), col, 4, '#0b0e17');
    if (o.musket) sh(ctx, T.rect(44, -230, 9, 190, 3), col, 3, '#0b0e17');
    if (o.face !== false) { ctx.fillStyle = o.eyeColor || 'rgba(230,236,245,.55)'; for (const d of [-18, 18]) { ctx.beginPath(); ctx.ellipse(d, HEAD_Y, 4, 5.5, 0, 0, 7); ctx.fill(); } }
    if (o.rimSide) { ctx.save(); ctx.beginPath(); p(ctx); ctx.arc(0, HEAD_Y, R, 0, 7); ctx.clip(); const g = ctx.createLinearGradient(o.rimSide * 60, 0, 0, 0); g.addColorStop(0, o.rimColor || 'rgba(255,180,110,.55)'); g.addColorStop(1, 'rgba(255,180,110,0)'); ctx.fillStyle = g; ctx.fillRect(-80, -260, 160, 260); ctx.restore(); }
    ctx.restore();
  }

  G.Cast = { person, silhouette, face, hat, COSTUME, POSE, HEAD_Y, R };
})(window);
