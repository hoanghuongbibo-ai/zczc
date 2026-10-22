// The Rome series' cast, all drawn in ONE style: the user's cow-field clip monk (ink outline, flat shading, profile face with a big
// round nose, dot eye in a white, heavy brows). The monk himself is the recurring main character.
// person(ctx, x, y, s, t, o): feet at (x, y), ~500 px tall at s = 1, faces left (o.face = 1 faces right).
//   o.kind: 'monk' | 'tunic' (working man) | 'woman' (long dress + headscarf) | 'toga' (o.trim = senator's stripe) | 'stola' (Roman woman + palla)
//           | 'tourist' (t-shirt, shorts, sneakers, backpack, cap)
//   o.pose: 'stand' | 'walk' | 'haul' | 'pry' | 'point' | 'wave' | 'hold' | 'up' | 'chin' | 'talk' | 'photo' | 'crossed'
//   colours: o.cloth, o.cloth2 (drape/shorts), o.hair, o.skin; o.hairStyle 'short'|'curly'|'long'|'bun'|'bald'; o.beard; o.cap; o.scarf
//   face: o.eyes 'open'|'happy'|'half'|'side'|'wide'|'closed', o.mouth 'smile'|'grin'|'frown'|'o'|'flat', o.brow 'sad'|'angry', o.talk
// P.chibi is replaced by an adapter, so every scene written for the old chibis now draws this cast.
(function (G) {
  const P = G.Paint, { ink, cel, mix } = P, INK = P.INK;
  // soft ground shadow without a blur filter (blur per figure is slow on crowded frames)
  const shadow = (ctx, w, a) => { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, w * .55); g.addColorStop(0, `rgba(40,24,14,${a})`); g.addColorStop(1, 'rgba(40,24,14,0)'); ctx.save(); ctx.scale(1, .16); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, w * .55, 0, 7); ctx.fill(); ctx.restore(); };
  const SKINS = ['#f2c9a2', '#e8b48c', '#c98e66', '#f4d2b0', '#a8724e'];
  let K = 1; // outline multiplier, so small figures keep a visible ink line
  const L = w => w * K;
  function foot(ctx, x, lift, o, back) { const skin = back ? mix(o.skin, '#6a4a3a', .2) : o.skin; ctx.save(); ctx.translate(x, -lift);
    if (o.kind === 'tourist') {       ink(ctx, back ? mix(o.shoe, '#3a3a40', .25) : o.shoe, c => { c.moveTo(-36, -2); c.quadraticCurveTo(-38, -22, -16, -24); c.lineTo(14, -24); c.quadraticCurveTo(22, -14, 20, 0); c.closePath(); }, L(3.5));
      ctx.fillStyle = '#f4f4f0'; ctx.fillRect(-36, -6, 56, 6); ctx.restore(); return; }
    ink(ctx, skin, c => { c.moveTo(-6, -46); c.lineTo(10, -46); c.lineTo(12, -8); c.lineTo(-8, -8); c.closePath(); }, L(3.5));
    ink(ctx, back ? '#4a2e1e' : '#5a3a26', c => { c.moveTo(-34, -2); c.quadraticCurveTo(-36, -12, -24, -12); c.lineTo(16, -12); c.quadraticCurveTo(22, -10, 20, 0); c.closePath(); }, L(3.5));
    ink(ctx, skin, c => { c.moveTo(-30, -12); c.quadraticCurveTo(-28, -26, -10, -26); c.lineTo(12, -24); c.lineTo(14, -12); c.closePath(); }, L(3));
    ctx.strokeStyle = back ? '#3a2416' : '#5a3a26'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (const sx of [-18, -2]) { ctx.beginPath(); ctx.moveTo(sx - 4, -12); ctx.lineTo(sx + 6, -26); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-4, -36); ctx.lineTo(12, -32); ctx.stroke();
    ctx.restore(); }
  function leg(ctx, hipX, footX, lift, top, col, back, w = 30) { const y0 = top, y1 = -22 - lift; ctx.save(); ctx.lineCap = 'round';
    ctx.strokeStyle = INK; ctx.lineWidth = w + L(5); ctx.beginPath(); ctx.moveTo(hipX, y0); ctx.lineTo(footX + 2, y1); ctx.stroke();
    ctx.strokeStyle = back ? mix(col, '#5a3a30', .22) : col; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); }
  function hand(ctx, x, y, skin, r = 15) { ink(ctx, skin, c => c.ellipse(x, y, r, r * .9, 0, 0, 7), L(3.5)); ctx.strokeStyle = 'rgba(120,70,50,.55)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - r * .5, y - r * .1); ctx.lineTo(x + r * .4, y - r * .1); ctx.stroke(); }
  // an arm in two segments; long sleeves cover both, short sleeves stop at the elbow and the forearm is bare skin
  function arm(ctx, S, E, H, o, back) { const cloth = back ? mix(o.cloth, '#3a2418', .2) : o.cloth, skin = back ? mix(o.skin, '#6a4a3a', .2) : o.skin, long = o.kind === 'monk' || o.kind === 'woman' || o.kind === 'stola';
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const seg = (a, b, w, col) => { ctx.strokeStyle = INK; ctx.lineWidth = w + L(8); ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); };
    if (long) { seg(S, E, 36, cloth); seg(E, H, 38, cloth); ctx.strokeStyle = cloth; ctx.lineWidth = 36; ctx.beginPath(); ctx.moveTo(...S); ctx.lineTo(...E); ctx.lineTo(...H); ctx.stroke(); }
    else { seg(E, H, 20, skin); seg(S, E, 34, o.kind === 'toga' ? (back ? mix(o.cloth, '#3a2418', .2) : o.cloth) : cloth); }
    ctx.restore(); hand(ctx, H[0], H[1], skin, 15); }
  const POSES = { // [elbow, hand] of the front arm, then optional back arm; shoulder fixed
    stand: [[-12, -262], [-18, -206]], hold: [[-22, -262], [-66, -262]], wave: [[-52, -330], [-58, -436]], point: [[-74, -330], [-146, -350]],
    up: [[-72, -372], [-92, -470], [44, -372], [58, -470]], chin: [[-26, -258], [-52, -330]], talk: [[-40, -276], [-84, -304]], photo: [[-56, -320], [-80, -392]],
    crossed: [[-20, -266], [16, -282], [30, -268], [-22, -280]], haul: [[2, -250], [20, -192]], pry: [[-62, -268], [-112, -228], [-30, -280], [-88, -246]] };
  function head(ctx, o, t, sw) { const look = o.brow || '', eyes = o.eyes || 'open', ph = o.seed || 0, blink = eyes !== 'closed' && ((t + ph * .7) % 3.9) < .12;
    const skin = o.skin, sh = mix(skin, '#8a4a3a', .22), hair = o.hair || '#3c2a1e', fem = o.kind === 'woman' || o.kind === 'stola' || o.fem;
    if (o.kind === 'monk' || o.scarf) { // the hood (monk: pointed tip trailing back) / headscarf
      const hc = o.kind === 'monk' ? o.cloth : o.scarf, hsh = mix(hc, '#2a1810', .3);
      cel(ctx, c => { c.moveTo(-74, 2); c.quadraticCurveTo(-92, -100, -20, -150); c.quadraticCurveTo(40, -170, 76, -138); if (o.kind === 'monk') { c.lineTo(108, -96 + sw * 2); c.quadraticCurveTo(86, -96, 70, -88); } else c.quadraticCurveTo(96, -100, 80, -60); c.quadraticCurveTo(86, -40, 62, 6); c.quadraticCurveTo(-6, 22, -74, 2); c.closePath(); }, hc, { shade: hsh, light: mix(hc, '#ffffff', .15), dx: 14, dy: 4, lw: L(5) });
      ink(ctx, mix(hc, '#1a1008', .55), c => { c.moveTo(-70, -6); c.quadraticCurveTo(-82, -88, -30, -120); c.quadraticCurveTo(20, -126, 26, -60); c.quadraticCurveTo(24, -10, -10, 4); c.closePath(); }, 0);
      cel(ctx, c => { c.moveTo(-66, -40); c.quadraticCurveTo(-70, -100, -32, -112); c.quadraticCurveTo(12, -114, 16, -60); c.quadraticCurveTo(14, -20, -20, -6); c.closePath(); }, skin, { shade: sh, dx: 10, dy: 0, lw: L(3.5) });
      ink(ctx, hair, c => { c.moveTo(-64, -84); c.quadraticCurveTo(-62, -116, -24, -116); c.quadraticCurveTo(12, -114, 16, -86); c.quadraticCurveTo(4, -96, -8, -90); c.quadraticCurveTo(-18, -100, -30, -92); c.quadraticCurveTo(-44, -102, -52, -90); c.quadraticCurveTo(-58, -94, -64, -84); c.closePath(); }, L(3));
    } else {
      const st = o.hairStyle || 'short';
      if (st === 'long') cel(ctx, c => { c.moveTo(-30, -110); c.quadraticCurveTo(44, -124, 50, -50); c.quadraticCurveTo(58, 10, 46, 40); c.lineTo(6, 34); c.quadraticCurveTo(18, -20, -10, -60); c.closePath(); }, hair, { shade: mix(hair, '#000', .3), dx: 8, dy: 0, lw: L(3.5) });
      if (st === 'bun') cel(ctx, c => c.ellipse(34, -108, 22, 20, 0, 0, 7), hair, { shade: mix(hair, '#000', .3), dx: 5, dy: 4, lw: L(3.5) });
      // neck, ear and the skull in profile: forehead, cheek, jaw
      cel(ctx, c => { c.moveTo(-64, -70); c.quadraticCurveTo(-66, -124, -14, -126); c.quadraticCurveTo(38, -124, 40, -66); c.quadraticCurveTo(40, -24, 14, -4); c.quadraticCurveTo(-10, 12, -40, 2); c.quadraticCurveTo(-62, -12, -60, -40); c.closePath(); }, skin, { shade: sh, light: mix(skin, '#fff', .2), dx: 12, dy: 0, lw: L(4) });
      cel(ctx, c => c.ellipse(16, -58, 11, 15, .1, 0, 7), skin, { shade: sh, dx: 3, dy: 2, lw: L(3) });
      if (st === 'short' || st === 'bun' || st === 'long') ink(ctx, hair, c => { c.moveTo(-62, -82); c.quadraticCurveTo(-68, -132, -12, -130); c.quadraticCurveTo(42, -128, 42, -70); c.quadraticCurveTo(42, -44, 30, -30); c.lineTo(26, -50); c.quadraticCurveTo(20, -88, -18, -96); c.quadraticCurveTo(-44, -98, -62, -82); c.closePath(); }, L(3.5));
      else if (st === 'curly') ink(ctx, hair, P.lumps(-10, -100, 54, 32, 11, .22, (o.seed || 1) + 2), L(3.5));
      else if (st === 'bald') ink(ctx, hair, c => { c.moveTo(4, -84); c.quadraticCurveTo(40, -86, 40, -50); c.lineTo(30, -36); c.quadraticCurveTo(26, -70, 4, -74); c.closePath(); }, L(3));
      if (o.cap) { cel(ctx, c => { c.moveTo(-60, -96); c.quadraticCurveTo(-56, -144, -6, -142); c.quadraticCurveTo(44, -138, 44, -94); c.closePath(); }, o.cap, { shade: mix(o.cap, '#000', .3), dx: 8, dy: 0, lw: L(4) }); ink(ctx, mix(o.cap, '#000', .2), c => { c.moveTo(-58, -98); c.lineTo(-104, -92); c.quadraticCurveTo(-100, -84, -56, -86); c.closePath(); }, L(3.5)); }
      if (o.wreath) { ctx.save(); ctx.strokeStyle = '#d8b040'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(-10, -104, 52, 12, -.08, 0, 7); ctx.stroke(); ctx.restore(); }
    }
    // nose, eye, brow
    if (o.kind === 'monk' || o.scarf) ink(ctx, skin, c => { c.moveTo(-62, -76); c.quadraticCurveTo(-90, -78, -88, -58); c.quadraticCurveTo(-84, -44, -64, -50); }, L(3.5)); else ink(ctx, skin, c => { c.moveTo(-62, -74); c.quadraticCurveTo(-82, -74, -80, -58); c.quadraticCurveTo(-78, -48, -62, -52); }, L(3.5));
    const ex = -44, ey = -72, lk = eyes === 'side' ? 4 : -3;
    ctx.strokeStyle = INK; ctx.fillStyle = INK; ctx.lineCap = 'round'; ctx.lineWidth = 3;
    if (blink || eyes === 'closed') { ctx.beginPath(); ctx.moveTo(ex - 7, ey); ctx.quadraticCurveTo(ex, ey + 4, ex + 7, ey); ctx.stroke(); }
    else if (eyes === 'happy') { ctx.beginPath(); ctx.moveTo(ex - 8, ey + 2); ctx.quadraticCurveTo(ex, ey - 8, ex + 8, ey + 2); ctx.stroke(); }
    else { const wide = eyes === 'wide' ? 1.25 : 1; ink(ctx, '#fffaf0', c => c.ellipse(ex, ey, 7 * wide, 9 * wide, 0, 0, 7), L(2.5)); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(ex + lk, ey + 1, 4, 0, 7); ctx.fill();
      if (eyes === 'half') { ink(ctx, skin, c => { c.moveTo(ex - 9, ey - 10); c.lineTo(ex + 9, ey - 10); c.lineTo(ex + 9, ey - 1); c.lineTo(ex - 9, ey - 1); c.closePath(); }, 0); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex - 9, ey - 1); ctx.lineTo(ex + 8, ey - 1); ctx.stroke(); } }
    if (fem) { ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(ex - 9, ey - 6); ctx.lineTo(ex - 14, ey - 10); ctx.stroke(); }
    ctx.strokeStyle = fem ? mix(hair, skin, .3) : (o.kind === 'monk' ? '#3c2a1e' : hair); ctx.lineWidth = fem ? 3.5 : 5; ctx.beginPath();
    if (look === 'sad') { ctx.moveTo(-56, -84); ctx.lineTo(-32, -92); } else if (look === 'angry') { ctx.moveTo(-56, -92); ctx.lineTo(-32, -82); } else { ctx.moveTo(-56, -88); ctx.quadraticCurveTo(-44, -94, -32, -88); } ctx.stroke();
    // beard (monk always), then the mouth
    if (o.beard) cel(ctx, c => { c.moveTo(-68, -46); c.quadraticCurveTo(-74, -4, -50, 26); c.lineTo(-44, 16); c.lineTo(-36, 32); c.lineTo(-26, 18); c.lineTo(-14, 30); c.lineTo(-6, 12); c.quadraticCurveTo(14, -10, 14, -46); c.quadraticCurveTo(-4, -30, -20, -40); c.quadraticCurveTo(-48, -50, -68, -46); c.closePath(); }, o.beardCol || hair, { shade: mix(o.beardCol || hair, '#000', .3), light: mix(o.beardCol || hair, '#fff', .15), dx: 8, dy: 0, lw: L(3.5) });
    const open = o.speak ? lip(t) : 0, m = o.speak ? (open > 0 ? 'speak' : 'flat') : o.talk ? (Math.sin(t * 13 + ph) > -.2 ? 'o' : 'flat') : (o.mouth || 'flat'), mx = -50, my = -30;
    if (m === 'speak') { const h = 3 + open * 1.6, w = 7 + Math.min(open, 5) * .8; ink(ctx, '#5a2220', c => c.ellipse(mx - 1, my + h * .35, w, h, 0, 0, 7), L(2.5)); if (open > 4) { ctx.fillStyle = '#f4f0e8'; ctx.fillRect(mx - w * .6, my + h * .35 - h + 1.5, w * 1.2, 3); } return; }
    ctx.strokeStyle = o.beard ? '#c07a5a' : '#8a4a3a'; ctx.lineWidth = 3; ctx.beginPath();
    if (m === 'o') { ink(ctx, '#6a2a24', c => c.ellipse(mx, my + 2, 6, 7, 0, 0, 7), L(2.5)); }
    else if (m === 'grin') { ink(ctx, '#fff', c => { c.moveTo(mx - 12, my - 3); c.quadraticCurveTo(mx, my + 14, mx + 10, my - 4); c.closePath(); }, L(2.5)); }
    else { if (m === 'smile') { ctx.moveTo(mx - 10, my - 2); ctx.quadraticCurveTo(mx, my + 6, mx + 8, my - 3); } else if (m === 'frown') { ctx.moveTo(mx - 10, my + 3); ctx.quadraticCurveTo(mx, my - 5, mx + 8, my + 3); } else { ctx.moveTo(mx - 9, my); ctx.lineTo(mx + 7, my); } ctx.stroke(); } }
  // lip-sync: mouth openness 0-9 from the narration (js/lipsync-*.js); beat: 1 right on a spoken word, falling off over ~0.4 s
  const lip = t => { const Ls = G.LIPSYNC; if (!Ls) return Math.max(0, Math.round(Math.sin(t * 13) * 4)); const i = Math.floor(t * Ls.fps); return +(Ls.env[i] || 0); };
  function beat(t) { const W = (G.LIPSYNC || {}).words || []; let lo = 0, hi = W.length - 1, k = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (W[m] <= t) { k = m; lo = m + 1; } else hi = m - 1; }
    return k < 0 ? [0, 0] : [Math.exp(-(t - W[k]) * 5), k]; }
  function person(ctx, x, y, s, t, o = {}) {
    o = Object.assign({ kind: 'tunic' }, o); if (o.kind === 'monk') o = Object.assign({ cloth: '#76503a', beard: true, hair: '#3c2a1e' }, o);
    o.skin = o.skin || SKINS[(o.seed || 0) % 3]; o.cloth = o.cloth || { tunic: '#9a7a54', woman: '#8fa4b8', toga: '#f4efe4', stola: '#c88a6a', tourist: '#3a6ab8' }[o.kind] || '#9a7a54';
    o.shoe = o.shoe || '#e8e4dc';
    const pose = o.pose || 'stand', moving = pose === 'walk' || pose === 'haul' || o.walk, ph = moving ? t * Math.PI * 2 * (o.speed ?? .9) + (o.seed || 0) : 0;
    const sw = moving ? Math.sin(ph) : 0, bob = moving ? Math.abs(Math.cos(ph)) * 6 : Math.sin(t * 1.6 + (o.seed || 0)) * 1.5, lean = pose === 'pry' ? -.12 + Math.sin(t * 3) * .03 : pose === 'haul' ? -.06 : 0;
    K = Math.max(1, 1.6 / (5 * s));
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.face === 1 ? -1 : 1), s);
    shadow(ctx, 160, .4);
    const long = o.kind !== 'tunic' && o.kind !== 'tourist', hemY = long ? -72 : o.kind === 'tunic' ? -176 : -196, fA = sw * 58, fB = -sw * 58;
    const lA = moving ? Math.max(0, -Math.cos(ph)) * 16 : 0, lB = moving ? Math.max(0, Math.cos(ph)) * 16 : 0;
    // back leg and foot
    if (!long) leg(ctx, 10, 22 + fB, lB, hemY + 10, o.kind === 'tourist' ? o.skin : (o.legs || o.skin), true);
    else leg(ctx, 12, 22 + fB, lB, -150, o.skin, true, 18); // shins run up inside the robe, so the feet stay joined to the body
    foot(ctx, 22 + fB, lB, o, true);
    if (long) { leg(ctx, -10, -22 + fA, lA, -150, o.skin, false, 18); foot(ctx, -22 + fA, lA, o, false); }
    ctx.save(); ctx.rotate(lean); ctx.translate(0, -bob);
    const P0 = POSES[pose === 'walk' ? 'stand' : pose] || POSES.stand, swing = moving && pose !== 'haul' ? sw * 22 : 0;
    // backpack and the back arm sit behind the body
    if (o.kind === 'tourist' && o.pack !== false) cel(ctx, c => { c.moveTo(34, -330); c.quadraticCurveTo(88, -330, 86, -280); c.lineTo(82, -226); c.quadraticCurveTo(60, -214, 36, -226); c.closePath(); }, o.pack || '#c8423a', { shade: mix(o.pack || '#c8423a', '#000', .3), dx: 8, dy: 0, lw: L(4) });
    if (P0[2]) arm(ctx, [14, -306], P0[2], P0[3], o, true); else if (moving) arm(ctx, [14, -306], [20 - swing * .5, -262], [24 - swing, -208], o, true);
    // the garment
    const hs = sw * 14, cloth = o.kind === 'tourist' ? o.cloth : o.cloth, csh = mix(cloth, '#3a2018', .28), cli = mix(cloth, '#ffffff', .18);
    const body = c => { c.moveTo(-40, -322); c.quadraticCurveTo(-56, -240, -64 + hs * (long ? 1 : .5), hemY); c.quadraticCurveTo(-2, hemY + 14, 64 + hs * (long ? 1 : .5), hemY - 4); c.quadraticCurveTo(54, -240, 46, -322); c.quadraticCurveTo(4, -338, -40, -322); c.closePath(); };
    if (o.kind === 'tourist') { // shorts, then the t-shirt over them
      cel(ctx, c => { c.moveTo(-50, -250); c.lineTo(-58 + hs * .4, -190); c.lineTo(56 + hs * .4, -192); c.lineTo(48, -250); c.closePath(); }, o.cloth2 || '#5a6a7a', { shade: mix(o.cloth2 || '#5a6a7a', '#000', .3), dx: 10, dy: 0, lw: L(4.5) });
      cel(ctx, c => { c.moveTo(-40, -322); c.quadraticCurveTo(-54, -280, -52, -232); c.quadraticCurveTo(0, -222, 50, -234); c.quadraticCurveTo(52, -280, 46, -322); c.quadraticCurveTo(4, -336, -40, -322); c.closePath(); }, cloth, { shade: csh, light: cli, dx: 12, dy: 0, lw: L(5) });
    } else {
      cel(ctx, body, cloth, { shade: csh, light: cli, dx: 16, dy: 0, lw: L(5) });
      ctx.strokeStyle = mix(cloth, '#2a1810', .4); ctx.globalAlpha = .55; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (const [a, b] of [[-20, -34], [18, 26], [44, 62]]) { ctx.beginPath(); ctx.moveTo(a, -200); ctx.quadraticCurveTo((a + b) / 2 + 4, (hemY - 200) / 2 - 60, b + hs, hemY - 6); ctx.stroke(); } ctx.globalAlpha = 1;
      if (o.kind === 'toga' || o.kind === 'stola') { // the drape over the shoulder, with the senator's stripe along its edge
        const d2 = o.kind === 'toga' ? mix(cloth, '#d8cfc0', .5) : (o.cloth2 || '#e8d8b8');
        cel(ctx, c => { c.moveTo(-36, -326); c.quadraticCurveTo(30, -290, 58, -150); c.lineTo(30, -126); c.quadraticCurveTo(0, -240, -50, -290); c.closePath(); }, d2, { shade: mix(d2, '#3a2018', .22), dx: 8, dy: 4, lw: L(4) });
        if (o.trim) { ctx.save(); ctx.strokeStyle = o.trim; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-44, -296); ctx.quadraticCurveTo(4, -240, 34, -132); ctx.stroke(); ctx.restore(); }
        if (o.trim) { ctx.save(); body(ctx); ctx.clip(); ctx.fillStyle = o.trim; ctx.fillRect(-90, hemY - 22, 180, 10); ctx.restore(); } }
      if (o.kind === 'monk') { ink(ctx, '#c8a878', c => { c.moveTo(-54, -236); c.quadraticCurveTo(0, -224, 54, -238); c.lineTo(55, -224); c.quadraticCurveTo(0, -210, -55, -222); c.closePath(); }, L(3.5)); ink(ctx, '#c8a878', c => c.ellipse(-46, -226, 11, 9, 0, 0, 7), L(3));
        for (const [cx, col, w] of [[-50, INK, 9], [-38, INK, 9], [-50, '#c8a878', 5], [-38, '#c8a878', 5]]) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(cx, -220); ctx.quadraticCurveTo(cx - 4 + sw * 4, -180, cx + sw * 8, -146); ctx.stroke(); } }
      else if (o.kind === 'tunic' || o.belt) ink(ctx, o.belt || '#5a3a24', c => { c.moveTo(-54, -250); c.quadraticCurveTo(0, -240, 54, -252); c.lineTo(55, -238); c.quadraticCurveTo(0, -226, -55, -236); c.closePath(); }, L(3.5));
    }
    // cowl / collar, head
    if (o.kind === 'monk') cel(ctx, c => { c.moveTo(-50, -328); c.quadraticCurveTo(-62, -292, -34, -272); c.quadraticCurveTo(10, -262, 48, -278); c.quadraticCurveTo(68, -300, 52, -336); c.closePath(); }, o.cloth, { shade: mix(o.cloth, '#2a1810', .3), dx: 12, dy: 6, lw: L(5) });
    else ink(ctx, mix(o.skin, '#8a4a3a', .15), c => { c.moveTo(-22, -326); c.lineTo(-20, -350); c.lineTo(10, -350); c.lineTo(14, -326); c.closePath(); }, L(3.5));
    if (pose === 'up') arm(ctx, [-4, -306], P0[0], P0[1], o, false); // both arms raised: they go up behind the head
    ctx.save(); ctx.translate(-6, o.kind === 'monk' ? -330 : -318); ctx.rotate((pose === 'pry' ? -.08 : 0) + (o.tilt || 0) + (o.speak ? -beat(t)[0] * .05 : 0)); if (o.kind !== 'monk') ctx.scale(.92, .92);
    head(ctx, o, t, sw); ctx.restore();
    // the front arm and whatever it holds
    const E = pose === 'walk' || (moving && pose === 'stand') ? [-12 + swing * .5, -262] : P0[0].slice(), Hh = pose === 'walk' || (moving && pose === 'stand') ? [-18 + swing, -206] : P0[1].slice();
    if (pose === 'wave') Hh[0] += Math.sin(t * 9) * 10;
    if (pose === 'talk') Hh[1] += Math.sin(t * 5 + (o.seed || 0)) * 12;
    if (o.speak && (pose === 'talk' || pose === 'stand' || pose === 'chin')) { const [b, k] = beat(t), g = [[-30, -18], [-10, -34], [-40, -6], [-20, -26]][k % 4]; if (pose !== 'chin') { E[0] = -40; E[1] = -276; Hh[0] = -84 + g[0] * b; Hh[1] = -300 + g[1] * b; } }
    if (pose !== 'up') arm(ctx, [-4, -306], E, Hh, o, false);
    if (o.prop) { ctx.save(); ctx.translate(Hh[0], Hh[1]); ctx.scale(1.4, 1.4); o.prop(ctx, 0, 0, t); ctx.restore(); }
    ctx.restore();
    if (!long) { leg(ctx, -12, -22 + fA, lA, hemY + 10, o.kind === 'tourist' ? o.skin : (o.legs || o.skin), false); foot(ctx, -22 + fA, lA, o, false); }
    ctx.restore(); K = 1; }
  function monk(ctx, x, y, s, t, o = {}) { const look = o.look; person(ctx, x, y, s, t, Object.assign({ kind: 'monk', face: o.dir === 1 ? 1 : -1, brow: look === 'worried' ? 'sad' : look === 'effort' ? 'angry' : '', mouth: look === 'effort' ? 'flat' : 'frown', seed: 3 }, o)); }
  // adapter: the old chibi calls (same x, y, scale and options) now draw this cast at the same height
  const ARMS = { down: 'stand', hold: 'hold', wave: 'wave', point: 'point', up: 'up', chin: 'chin', hips: 'stand', crossed: 'crossed' };
  function chibiAdapter(ctx, x, y, s, t, o = {}) { const kind = o.kind || (o.toga ? 'toga' : 'tunic');
    let pose = o.pose || (o.walk && (!o.arms || o.arms === 'down') ? 'walk' : ARMS[o.arms] || 'stand'); if (pose === 'up' && o.prop) pose = 'photo'; if (o.talk && pose === 'stand') pose = 'talk';
    const face = o.dir === 1 ? 1 : o.dir === -1 ? -1 : (o.look === 1 ? 1 : o.look === -1 ? -1 : (x < 640 ? 1 : -1));
    person(ctx, x, y, s * .62, t, Object.assign({}, o, { kind, pose, face, walk: !!o.walk, cloth: o.cloth || o.robe, cloth2: o.cloth2 || (kind === 'toga' ? undefined : o.toga), mouth: o.mouth === 'none' ? 'flat' : o.mouth })); }
  P.person = person; P.monk = monk; P.chibiOld = P.chibi; P.chibi = chibiAdapter;
})(window);
