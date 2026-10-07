/* Part 3, second half — "The Medium Who Nearly Won", plus the shot timeline and soundtrack cues. */
(function (G) {
  'use strict';
  const T = G.Toon, FX = G.FX, Ch = G.Chars, P3 = G.Part3A, L3 = P3.lib;
  const { W, H, shape, poly, rect, circle, ellipse, smooth, line, grad, cam, prog, lerp, ease, clamp, rng, glow } = T;
  const A = G.T3, INK = FX.INK, fig = FX.fig;
  const at = k => A[k], since = (t, k) => t - A[k];
  const { chapter, frame, label, parlour, seanceRoom, newspaper, slam, bubble, cross, tick, ring, houdini, cast, margery, breathe, blink, RED, PAPER } = L3;
  const BP = '#23476e', BL = '#e6f0ff', GOLD = '#f6c945';
  const blueprint = (ctx) => { shape(ctx, BP, 0, rect(0, 0, W, H)); ctx.save(); ctx.strokeStyle = 'rgba(220,235,255,.16)'; ctx.lineWidth = 1.5; for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore(); };
  const bpText = (ctx, s, x, y, px = 22, color = BL, align = 'left') => { ctx.save(); ctx.font = FX.FONT(700, px); ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore(); };
  // the prize cheque
  function cheque(ctx, x, y, s, rot = -.03) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-264, -114, 540, 240);
    shape(ctx, '#dfeedd', 4, rect(-270, -120, 540, 240, 6)); shape(ctx, null, 2, rect(-254, -104, 508, 208, 4));
    ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.font = FX.FONT(700, 18); ctx.fillText('PAY TO: ANY MEDIUM WHO PROVES IT GENUINE', -230, -64);
    ctx.font = FX.DISPLAY(80); ctx.fillStyle = '#2f6a46'; ctx.fillText('$2,500', -230, 20);
    ctx.font = FX.FONT(600, 16); ctx.fillStyle = INK; ctx.fillText('SCIENTIFIC AMERICAN PRIZE', -230, 84);
    line(ctx, [[60, 70], [230, 70]], 2.5); ctx.font = 'italic 22px Georgia, serif'; ctx.fillText('The Committee', 80, 52);
    ctx.restore();
  }
  // the Margery bell box: a hinged lid on a spring; pressing it closes the contacts and the bell rings
  function bellBox(ctx, x, y, s, press, bp) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const c1 = bp ? BL : INK, wood = bp ? 'rgba(230,240,255,.12)' : '#8a5a34', lid = press * 10;
    shape(ctx, wood, bp ? 0 : 4.5, rect(-120, -60, 240, 120, 4)); if (bp) { ctx.lineWidth = 4; ctx.strokeStyle = c1; ctx.strokeRect(-120, -60, 240, 120); }
    ctx.save(); ctx.translate(-120, -60); ctx.rotate(press * .04); shape(ctx, bp ? 'rgba(230,240,255,.2)' : '#a06a40', bp ? 0 : 4.5, rect(0, -18 + lid * .3, 240, 18, 3)); if (bp) { ctx.lineWidth = 4; ctx.strokeStyle = c1; ctx.strokeRect(0, -18 + lid * .3, 240, 18); } ctx.restore();
    if (bp) {
      line(ctx, [[-60, -40], [-60, 20]], 3, c1); for (let i = 0; i < 5; i++) line(ctx, [[-72, -30 + i * 10], [-48, -25 + i * 10]], 3, c1);                // spring
      line(ctx, [[60, -40 + lid * .3], [60, -20]], 4, GOLD); line(ctx, [[50, -6], [70, -6]], 4, GOLD);                                                     // contacts
      shape(ctx, 'rgba(230,240,255,.25)', 0, rect(10, 10, 60, 36)); ctx.lineWidth = 3; ctx.strokeStyle = c1; ctx.strokeRect(10, 10, 60, 36); bpText(ctx, 'BATTERY', 40, 28, 12, c1, 'center');
      line(ctx, [[60, -6], [60, 10]], 2.5, c1);
    }
    // the bell on top-right, hammer strikes while pressed
    shape(ctx, bp ? 'rgba(246,201,69,.35)' : '#c9a14a', 4, c => c.arc(150, -40, 34, Math.PI, 0)); shape(ctx, bp ? 'rgba(246,201,69,.35)' : '#c9a14a', 4, rect(116, -42, 68, 10, 3));
    ctx.restore();
  }
  const dingLines = (ctx, x, y, k, s = 1) => { if (k <= 0 || k > .9) return; ctx.save(); ctx.globalAlpha = 1 - k / .9; for (const a of [-.9, -.45, 0, .45, .9]) { const r0 = 40 * s + k * 50 * s; line(ctx, [[x + Math.sin(a) * r0, y - Math.cos(a) * r0], [x + Math.sin(a) * (r0 + 26 * s), y - Math.cos(a) * (r0 + 26 * s)]], 5, GOLD); } ctx.restore(); };

  // ================= THE MEDIUM WHO NEARLY WON =================
  function b0(ctx, lt, dur, t) { // chapter + title card
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    const k = FX.settle(clamp((lt - .5) / .35));
    ctx.save(); ctx.translate(640, 420); ctx.scale(k, k); ctx.rotate(-.03);
    FX.paperDoc(ctx, 0, 0, 620, 250, { lines: 0, draw: c => { c.font = FX.FONT(700, 24); c.fillStyle = '#5a5048'; c.textAlign = 'center'; c.fillText('A PRIZE FOR PROOF', 0, -70); } });
    FX.bigText(ctx, 'THE $2,500 PRIZE', 0, 10, 72, { color: GOLD });
    ctx.restore(); ctx.restore();
    FX.vignette(ctx, 640, 380, .6);
    chapter(ctx, 'THE MEDIUM WHO NEARLY WON', lt);
    FX.dateTag(ctx, 'EARLY 1920s');
  }
  function b1(ctx, lt, dur, t) { // Scientific American offers $2,500 to any medium who can convince the committee
    const o = since(t, 'offered2');
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    const k = ease.out(clamp(lt / .4));
    ctx.save(); ctx.translate(lerp(-300, 380, k), 370); ctx.rotate(-.05);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-184, -244, 380, 500);
    shape(ctx, '#e9e2cf', 4, rect(-190, -250, 380, 500, 3)); shape(ctx, '#2a4a6a', 0, rect(-176, -236, 352, 110));
    ctx.fillStyle = '#f1ead8'; ctx.font = `700 34px Georgia, serif`; ctx.textAlign = 'center'; ctx.fillText('SCIENTIFIC', 0, -190); ctx.fillText('AMERICAN', 0, -148);
    ctx.fillStyle = INK; ctx.font = FX.FONT(600, 16); ctx.fillText('MONTHLY MAGAZINE · 1922', 0, -108);
    ctx.font = FX.DISPLAY(40); ctx.fillText('$2,500', 0, -40); ctx.font = FX.FONT(700, 22); ctx.fillText('FOR PROOF OF', 0, 4); ctx.fillText('PSYCHIC POWERS', 0, 34);
    shape(ctx, '#cfc4aa', 3, rect(-130, 70, 260, 150)); L3.ghostIcon(ctx, 0, 150, 1.2, .9);
    ctx.restore();
    if (o > 0) cheque(ctx, lerp(W + 300, 860, ease.out(clamp(o / .5))), 420, .9, .04);
    ctx.restore();
    FX.caption(ctx, 'TO ANY MEDIUM WHO COULD CONVINCE THE COMMITTEE', since(t, 'convince') + .1, 0);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1922 – 1924');
  }
  function b2(ctx, lt, dur, t) { // the committee of investigators — Houdini sat on it
    const s = since(t, 'sat'), hl = clamp(s / .3);
    ctx.save(); cam(ctx, lerp(FX.push(lt, dur, 1, 1.03), 1.4, ease.inOut(clamp(s / .8))), lerp(640, 900, ease.inOut(clamp(s / .8))), lerp(400, 360, ease.inOut(clamp(s / .8))));
    parlour(ctx, '#3e4650');
    const members = [['professor', 'greySuit', 250], ['editor', 'greySuit', 450], ['doctor', 'greySuit', 650], ['houdini', 'suit', 900], ['bowler', 'overcoat', 1100]];
    members.forEach(([head, outfit, x], i) => {
      const H0 = head === 'houdini';
      const pose = H0 ? houdini({ hands: { L: [-120, -560], R: [120, -560] }, face: { brows: hl > 0 ? 'smug' : 'calm', mouth: hl > 0 ? 'smirk' : 'flat', look: [.4, 0], eyes: blink(t, at('convince') + 1.3 + i * .4) }, breathe: breathe(t) })
        : cast(head, outfit, { hands: { L: [-120, -560], R: [120, -560] }, face: { brows: 'calm', mouth: 'flat', look: [(640 - x) / 900, .1], eyes: blink(t, at('convince') + .6 + i * .7) } });
      if (head === 'bowler') pose.face.brows = 'worried';
      fig(ctx, x, 820, .34, pose, { mirror: x > 640 });
    });
    if (hl > 0) glow(ctx, 900, 400, 260 * hl, `rgba(255,230,160,${.35 * hl})`);
    shape(ctx, '#5a3a28', 5, rect(120, 560, 1080, 40, 4)); shape(ctx, '#4a2e20', 5, rect(140, 600, 1040, 160));
    members.forEach(([head, , x]) => { const H0 = head === 'houdini'; shape(ctx, H0 && hl > 0 ? GOLD : PAPER, 3.5, rect(x - 70, 530, 140, 34, 3)); bpText(ctx, H0 ? 'HOUDINI' : ['PROF.', 'EDITOR', 'DR.', '', 'MR.'][members.findIndex(m => m[0] === head)], x, 548, 18, INK, 'center'); });
    ctx.restore();
    if (s < 0) { ctx.save(); ctx.translate(640, 120); ctx.rotate(-.02); FX.paperDoc(ctx, 0, 0, 520, 90, { lines: 0, draw: c => { c.font = FX.DISPLAY(40); c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('ARE THE POWERS GENUINE?', 0, 4); } }); ctx.restore(); }
    FX.caption(ctx, s > 0 ? 'HOUDINI SAT ON THE COMMITTEE' : 'THE COMMITTEE OF INVESTIGATORS', lt, .3);
    FX.vignette(ctx, 640, 400, .5);
    FX.dateTag(ctx, '1924');
  }
  function b3(ctx, lt, dur, t) { // Mina Crandon of Boston — "Margery" — wife of a respected surgeon
    const m = since(t, 'margery'), sg = since(t, 'surgeon');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 560, 380);
    parlour(ctx, '#4a3e4c');
    frame(ctx, 440, 330, 280, 360, '#cdbb98', () => fig(ctx, 440, 950, .6, margery({ face: { mouth: 'smile', brows: 'calm', look: [.3, 0], eyes: blink(t, at('mina') + 1.2, at('mina') + 4) }, breathe: breathe(t) })), true);
    ctx.restore();
    label(ctx, [['MINA CRANDON', FX.DISPLAY(36)], ['of Boston', FX.FONT(600, 20)]], 920, 190, (lt - .2) / .35, .03, 360);
    if (m > 0) { ctx.save(); ctx.translate(920, 360); ctx.scale(slam(m), slam(m)); ctx.rotate(-.04); newspaper(ctx, 0, 0, 380, 150, { mast: 'BOSTON EVENING BUGLE', head: [], seed: 31, draw: c => FX.bigText(c, '"MARGERY"', 0, 26, 44, { color: GOLD }) }); ctx.restore(); }
    if (sg > 0) { const k = ease.out(clamp(sg / .4)); ctx.save(); ctx.translate(lerp(W + 200, 960, k), 560);
      shape(ctx, '#f1ead8', 3.5, rect(-190, -70, 380, 140, 3)); ctx.save(); ctx.beginPath(); ctx.rect(-180, -60, 120, 120); ctx.clip(); shape(ctx, '#cfc4aa', 0, rect(-180, -60, 120, 120)); fig(ctx, -120, 300, .26, cast('doctor', 'greySuit', { face: { mouth: 'smile', brows: 'calm' } }), { filter: 'sepia(.6)' }); ctx.restore();
      bpText(ctx, 'wife of', -40, -24, 18, '#5a5048'); bpText(ctx, 'A RESPECTED', -40, 6, 24, INK); bpText(ctx, 'SURGEON', -40, 36, 24, INK); ctx.restore(); }
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, 'BOSTON, 1924');
  }
  function b4(ctx, lt, dur, t) { // the darkened séance: "Walter" speaks, swears, gives orders
    const v = since(t, 'darkened') - 1.8, sp = since(t, 'spoke'), sw = since(t, 'swore'), od = since(t, 'orders');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    seanceRoom(ctx, t, { light: .7, people: () => {
      fig(ctx, 640, 900, .42, margery({ hands: { L: [-170, -700], R: [170, -700] }, face: { eyes: 0, brows: 'calm', mouth: 'flat' }, breathe: breathe(t) * .5 }));
      for (const [x, m] of [[330, false], [950, true]]) fig(ctx, x, 940, .42, cast(x < 640 ? 'bowler' : 'cloche', x < 640 ? 'overcoat' : 'dress20s', { hands: { L: [-170, -700], R: [170, -700] }, face: { brows: v > 0 ? 'up' : 'calm', mouth: sw > 0 && sw < 1.2 ? 'o' : 'flat', look: v > 0 ? [m ? .3 : -.3, -.9] : [0, 0] } }), { mirror: m });
    } });
    ctx.restore();
    // Walter's voice: a speech bubble from the dark, nobody's mouth
    const wob = Math.sin(lt * 3) * 6;
    if (v > 0) { glow(ctx, 640, 170, 220, 'rgba(180,200,255,.18)'); bpText(ctx, '"WALTER"', 640, 70 + wob, 22, '#cfe0ff', 'center'); }
    const txt = od > 0 ? 'SIT STILL!' : sw > 0 ? '#@$%!' : sp > 0 ? 'GOOD EVENING…' : v > 0 ? '…' : null;
    if (txt) bubble(ctx, 640, 170 + wob, txt.length > 6 ? 380 : 240, 100, 600, 320, v, { text: txt, fill: '#e8eeff', color: od > 0 ? RED : INK });
    FX.caption(ctx, 'HER DEAD BROTHER, WALTER — SHE SAID', v + .2, 0);
    FX.vignette(ctx, 640, 400, .7);
    FX.dateTag(ctx, 'BOSTON, 1924');
  }
  function b5(ctx, lt, dur, t) { // bells rang, objects moved
    const ob = since(t, 'objects');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1.05, 1.1), 640, 420);
    seanceRoom(ctx, t, { light: .65, jolt: ob > 0 && ob < .5 ? FX.ring(ob, 8, 7, 9) : 0 });
    // a hand bell on the table, swinging and ringing by itself
    const sw = FX.pendulum(lt - .1, .5, 60, .8); ctx.save(); ctx.translate(460, 470); ctx.rotate(sw);
    shape(ctx, '#6b4f39', 4, rect(-7, -86, 14, 46, 5)); shape(ctx, '#c9a14a', 4.5, c => { c.moveTo(-40, 40); c.quadraticCurveTo(-36, -44, 0, -44); c.quadraticCurveTo(36, -44, 40, 40); c.closePath(); }); shape(ctx, '#7a5a20', 3, circle(-sw * 30, 46, 10)); ctx.restore();
    if (lt < 1.4) dingLines(ctx, 460, 460, (lt % .35) / .35 * .8, 1.2);
    // a megaphone-trumpet lifts off the table and drifts
    if (ob > 0) { const k = ease.out(clamp(ob / 1)); ctx.save(); ctx.translate(820 + k * 40, 540 - k * 200 + Math.sin(lt * 3) * 8); ctx.rotate(-.4 + k * .3); glow(ctx, 0, 0, 100, 'rgba(255,220,140,.35)'); shape(ctx, '#c9a14a', 4, poly([[-10, -8], [90, -40], [90, 40], [-10, 8]])); ctx.restore();
      FX.bigText(ctx, 'OBJECTS MOVED', 640, 140, 60, { color: PAPER }); }
    else { ctx.save(); ctx.translate(820, 548); ctx.rotate(-.1); shape(ctx, '#c9a14a', 4, poly([[-10, -8], [90, -30], [90, 30], [-10, 8]])); ctx.restore(); FX.bigText(ctx, 'BELLS RANG', 640, 140, 60, { color: PAPER }); }
    ctx.restore();
    FX.vignette(ctx, 640, 400, .7);
  }
  function b6(ctx, lt, dur, t) { // July 1924: Houdini goes to Boston to sit with her himself
    const k = ease.inOut(prog(lt, .3, dur - .6));
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 380);
    shape(ctx, '#9fc3cf', 0, rect(-400, -300, 2100, 1300));
    shape(ctx, '#e8dcbc', 4, smooth([[-300, -200], [1300, -200], [1260, 40], [1020, 120], [980, 210], [1080, 250], [960, 300], [800, 380], [600, 480], [480, 560], [380, 760], [-300, 760]]));
    ctx.save(); ctx.font = FX.FONT(700, 22); ctx.fillStyle = 'rgba(80,60,40,.6)'; ctx.fillText('MASSACHUSETTS', 640, 140); ctx.fillText('NEW YORK', 160, 300); ctx.restore();
    const a = [300, 520], b = [960, 230];
    ctx.save(); ctx.setLineDash([14, 12]); line(ctx, [a, b], 5, '#b8322a'); ctx.restore();
    for (const [p, n, dx] of [[a, 'NEW YORK CITY', 0], [b, 'BOSTON', 0]]) { shape(ctx, '#b8322a', 3, circle(...p, 12)); bpText(ctx, n, p[0] + 20, p[1] + 34, 22, INK); }
    // a little steam train with Houdini at the window
    const x = lerp(a[0], b[0], k), y = lerp(a[1], b[1], k), ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    ctx.save(); ctx.translate(x, y - 24); ctx.rotate(ang * .3);
    shape(ctx, '#2a2a2e', 4, rect(-70, -34, 100, 50, 6)); shape(ctx, '#7a2621', 4, rect(-160, -40, 84, 56, 6)); shape(ctx, '#f1ead8', 3, rect(-146, -30, 50, 26, 3));
    ctx.save(); ctx.beginPath(); ctx.rect(-146, -30, 50, 26); ctx.clip(); fig(ctx, -121, 90, .09, houdini({ face: { brows: 'smug', mouth: 'smirk', look: [-.6, 0] } }), { mirror: true }); ctx.restore();
    shape(ctx, '#2a2a2e', 3.5, rect(10, -60, 18, 28, 3)); for (const wx of [-140, -96, -50, 6]) shape(ctx, '#1d1a17', 3, circle(wx, 20, 12));
    ctx.restore();
    for (let i = 0; i < 4; i++) { const u = (lt * 1.5 + i / 4) % 1; ctx.save(); ctx.globalAlpha = (1 - u) * .7; shape(ctx, '#f6f6f2', 0, circle(x + 20 - u * 80, y - 90 - u * 60, 12 + u * 22)); ctx.restore(); }
    ctx.restore();
    FX.vignette(ctx, 640, 380, .45);
    FX.caption(ctx, 'TO SIT WITH HER HIMSELF', lt, .6);
    FX.dateTag(ctx, 'JULY 1924');
  }
  function b7(ctx, lt, dur, t) { // the bell box: pressure on the lid rings the bell
    const p = since(t, 'pressure'), press = p > 0 ? (Math.sin((p) * 4) > 0 ? 1 : 0) * clamp(p / .1) : 0;
    blueprint(ctx);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.05), 640, 400);
    bellBox(ctx, 600, 430, 1.8, press, true);
    if (press > .5) dingLines(ctx, 600 + 150 * 1.8, 430 - 50 * 1.8, (p % (Math.PI / 2)) / 1.2, 1.4);
    if (p > 0) { const y = 430 - 80 * 1.8 - 90 + press * 40; line(ctx, [[600 - 60, y], [600 - 60, y + 60]], 6, GOLD); shape(ctx, GOLD, 0, poly([[600 - 76, y + 50], [600 - 44, y + 50], [600 - 60, y + 74]])); bpText(ctx, 'PRESSURE ON THE LID', 600 - 40, y - 20, 22, GOLD); }
    ctx.restore();
    bpText(ctx, 'FIG. 2 — THE BELL BOX', 80, 660, 24);
    bpText(ctx, 'lid → contacts close → bell rings', 80, 620, 20, 'rgba(230,240,255,.7)');
    FX.dateTag(ctx, 'THE TESTS');
  }
  function b8(ctx, lt, dur, t) { // top-down diagram: Houdini at Margery's left, holding her hand, his leg against hers
    const hd = since(t, 'holding'), lg = since(t, 'leg');
    blueprint(ctx);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    ctx.lineWidth = 4; ctx.strokeStyle = BL;
    ctx.beginPath(); ctx.arc(640, 340, 160, 0, Math.PI * 2); ctx.stroke(); bpText(ctx, 'TABLE', 640, 340, 22, BL, 'center');
    // Margery at the near side, facing the table; Houdini in the next seat on her left (screen right in this top view)
    const M = [640, 590], Hp = [820, 560];
    for (const [p, n, c] of [[M, 'MARGERY', GOLD], [Hp, 'HOUDINI', '#ffb0a0'], [[460, 560], 'SITTER', BL], [[400, 300], 'SITTER', BL], [[880, 300], 'SITTER', BL], [[640, 112], 'SITTER', BL]]) {
      ctx.lineWidth = 4; ctx.strokeStyle = c; ctx.beginPath(); ctx.arc(p[0], p[1], 42, 0, Math.PI * 2); ctx.stroke(); bpText(ctx, n, p[0], p[1] + 66, 18, c, 'center');
    }
    // the bell box on the floor between their feet
    const bx = [730, 680]; ctx.lineWidth = 4; ctx.strokeStyle = GOLD; ctx.strokeRect(bx[0] - 30, bx[1] - 18, 60, 36); bpText(ctx, 'BELL BOX', bx[0], bx[1] + 36, 16, GOLD, 'center');
    if (lt > .3) { const k = ease.out(clamp((lt - .3) / .5)); line(ctx, [[bx[0] + 120, bx[1] - 60], [bx[0] + 120 - 70 * k, bx[1] - 60 + 40 * k]], 4, GOLD); }
    if (hd > 0) { const k = clamp(hd / .4); ctx.save(); ctx.setLineDash([10, 8]); line(ctx, [[M[0] + 40, M[1] - 20], [lerp(M[0] + 40, Hp[0] - 40, k), lerp(M[1] - 20, Hp[1] - 10, k)]], 6, '#ffb0a0'); ctx.restore(); bpText(ctx, 'HOLDING HER HAND', 730, 470, 20, '#ffb0a0', 'center'); }
    if (lg > 0) { const k = clamp(lg / .4); line(ctx, [[M[0] + 30, M[1] + 30], [lerp(M[0] + 30, Hp[0] - 30, k), lerp(M[1] + 30, Hp[1] + 40, k)]], 10, 'rgba(255,176,160,.7)'); bpText(ctx, 'LEG AGAINST LEG', 900, 650, 20, '#ffb0a0', 'center'); }
    ctx.restore();
    bpText(ctx, 'FIG. 3 — THE CIRCLE (TOP VIEW)', 80, 670, 24);
    FX.dateTag(ctx, 'JULY 1924');
  }
  function b9(ctx, lt, dur, t) { // under the table: he felt her leg move as her foot reached the box
    const f = since(t, 'foot'), reach = ease.inOut(clamp((t - at('felt') - 1.2) / (at('foot') - at('felt') - 1.2))), press = clamp(f / .15);
    blueprint(ctx);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 420);
    // table edge + two seated sitters seen from the side, under-table cutaway
    line(ctx, [[160, 250], [1120, 250]], 6, BL); line(ctx, [[200, 250], [200, 640]], 5, BL); line(ctx, [[1080, 250], [1080, 640]], 5, BL); line(ctx, [[100, 640], [1180, 640]], 4, BL);
    bpText(ctx, 'TABLE', 640, 228, 20, BL, 'center');
    // Houdini's leg (pressed against hers) and Margery's leg, which slides toward the box
    const knee = [520, 380], hip = [360, 360];
    const ank = [lerp(560, 760, reach), lerp(600, 560 + press * 10, reach)], foot = [ank[0] + 50, ank[1] + 26];
    line(ctx, [hip, knee, ank, foot], 18, 'rgba(246,201,69,.9)'); bpText(ctx, "MARGERY'S LEG", 380, 330, 18, GOLD);
    line(ctx, [[360, 410], [540, 430], [560, 630], [610, 636]], 18, 'rgba(255,176,160,.85)'); bpText(ctx, "HOUDINI'S LEG", 300, 470, 18, '#ffb0a0');
    // the box on the floor under the table
    bellBox(ctx, 870, 600, .7, press, true);
    if (f > 0) dingLines(ctx, 870 + 150 * .7, 600 - 40 * .7, f % .4 / .4, .8);
    if (reach > .1 && f < 0) { ctx.save(); ctx.globalAlpha = .7; line(ctx, [[440, 400], [440, 380]], 3, '#ffb0a0'); ctx.restore(); }
    ctx.restore();
    // Houdini's face, up top, eyes sliding sideways as he feels it
    ctx.save(); ctx.beginPath(); ctx.arc(1110, 150, 90, 0, Math.PI * 2); ctx.clip(); shape(ctx, '#3a2c26', 0, rect(1000, 40, 220, 220));
    fig(ctx, 1110, 560, .36, houdini({ face: { brows: reach > .3 ? 'smug' : 'calm', mouth: 'flat', look: [reach > .3 ? -1 : 0, .4], eyes: 1 } }), { mirror: true }); ctx.restore();
    shape(ctx, null, 5, circle(1110, 150, 90));
    if (f > 0) FX.bigText(ctx, 'DING!', 900, 430, 60, { color: GOLD });
    bpText(ctx, 'FIG. 4 — UNDER THE TABLE (AS HOUDINI DESCRIBED IT)', 80, 690, 22);
  }
  // the "Margery box": a wooden cabinet with a neck hole and two arm holes, locked with hasps
  function cabinet(ctx, x, y, s, closed, inside) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    shape(ctx, '#8a5a34', 5, rect(-170, -300, 340, 300, 4));
    for (let i = 1; i < 6; i++) line(ctx, [[-170, -300 + i * 50], [170, -300 + i * 50]], 2.5, 'rgba(40,20,10,.35)');
    shape(ctx, '#7a4a2a', 5, poly([[-190, -330], [190, -330], [170, -300], [-170, -300]]));
    for (const ax of [-120, 120]) shape(ctx, '#2a1a12', 4, circle(ax, -230, 22));
    if (inside) inside(ctx);
    // the top panels slide in to the neck; hasps + padlocks on the front
    const c = clamp(closed);
    shape(ctx, '#a06a40', 4.5, rect(-190, -350, lerp(40, 160, c), 26, 3)); shape(ctx, '#a06a40', 4.5, rect(190 - lerp(40, 160, c), -350, lerp(40, 160, c), 26, 3));
    if (c > .95) for (const hx of [-60, 60]) { shape(ctx, '#9aa3a8', 3.5, rect(hx - 10, -330, 20, 40, 3)); const d = FX.settle(clamp((closed - 1) / .3)); shape(ctx, null, 7, cc => cc.arc(hx, -278 - 14 * (1 - d), 14, Math.PI, 0)); shape(ctx, '#c9a14a', 4, rect(hx - 18, -282, 36, 34, 6)); }
    ctx.restore();
  }
  function b10(ctx, lt, dur, t) { // a cabinet built to confine her body during the séance
    const close = clamp((lt - 1.2) / .8) + Math.max(0, lt - 2) * .4;
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    parlour(ctx, '#3e3a44');
    const S = .38, x = 560, y = 720;
    // Margery seated inside: only her head shows above, her hands through the arm holes
    fig(ctx, x, y - 10, S, margery({ hands: { L: [-379, -660], R: [379, -660] }, handShape: { L: 'none', R: 'none' }, face: { brows: close > .5 ? 'worried' : 'calm', mouth: 'flat', look: [.7, 0], eyes: blink(t, at('cabinet') + 2) } }));
    cabinet(ctx, x, y, 1.2, close, null);
    for (const ax of [-120, 120]) Ch.hand(ctx, [x + ax * 1.2, y - 230 * 1.2], ax < 0 ? Math.PI : 0, 'open', '#f6c7a6', .4 * 1.2);
    fig(ctx, 980, 720, .38, houdini({ hands: { L: [110, -760], R: [-110, -740] }, face: { brows: 'smug', mouth: 'smirk', look: [.8, 0], eyes: blink(t, at('cabinet') + 1) }, breathe: breathe(t) }));
    ctx.restore();
    FX.caption(ctx, "HOUDINI'S CABINET: TO CONFINE HER DURING THE SÉANCE", lt, .3);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, 'BOSTON, 1924');
  }
  // a carpenter's folding ruler, n segments, opening by k (0 folded .. 1 straight)
  function ruler(ctx, x, y, seg, n, k, ang = 0) {
    let px = x, py = y, a = ang;
    for (let i = 0; i < n; i++) {
      const fold = i === 0 ? 0 : (1 - k) * Math.PI * (i % 2 ? .96 : -.96); a += fold;
      const qx = px + Math.cos(a) * seg, qy = py + Math.sin(a) * seg;
      ctx.save(); ctx.translate(px, py); ctx.rotate(a); shape(ctx, '#e8c86a', 3.5, rect(0, -9, seg, 18, 2)); for (let m = 10; m < seg; m += 10) line(ctx, [[m, -9], [m, m % 30 ? -3 : 2]], 1.5); ctx.restore();
      shape(ctx, '#9aa3a8', 2.5, circle(px, py, 4)); px = qx; py = qy;
    }
    return [px, py];
  }
  function b11(ctx, lt, dur, t) { // a folding ruler turns up inside — exactly the tool to press a bell at a distance
    const r = since(t, 'ruler'), ex = since(t, 'exactly');
    blueprint(ctx);
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 400);
    // x-ray of the cabinet: dotted outline, the ruler glowing inside
    ctx.save(); ctx.setLineDash([12, 10]); ctx.lineWidth = 4; ctx.strokeStyle = BL; ctx.strokeRect(300, 200, 400, 380); ctx.beginPath(); ctx.arc(500, 200, 40, Math.PI, 0); ctx.stroke(); ctx.restore();
    bpText(ctx, 'THE CABINET', 500, 610, 20, BL, 'center');
    if (r > 0) {
      const open = ex > 0 ? ease.inOut(clamp(ex / 1.2)) : 0, a = FX.settle(clamp(r / .35));
      ctx.save(); ctx.globalAlpha = a; glow(ctx, 500, 420, 120, 'rgba(246,201,69,.35)');
      const tip = ex > 0 ? ruler(ctx, 470, 200, 66, 7, open, lerp(.4, -.08, open)) : ruler(ctx, 460, 440, 66, 5, 0, 0);
      ctx.restore();
      if (ex > 0) { bellBox(ctx, 1020, 230, .55, open > .95 ? 1 : 0, true); if (open > .95) dingLines(ctx, 1020 + 150 * .55, 230 - 40 * .55, (ex - 1.2) % .4 / .4, .7); bpText(ctx, 'PRESSES A BELL FROM A DISTANCE', 900, 120, 22, GOLD, 'center'); }
      else bpText(ctx, "A FOLDING CARPENTER'S RULER", 500, 520, 22, GOLD, 'center');
    }
    ctx.restore();
    bpText(ctx, 'FIG. 5 — FOUND INSIDE AT ONE SITTING', 80, 670, 24);
  }
  function b12(ctx, lt, dur, t) { // planted by Houdini? planted to discredit him? never resolved
    const ds = since(t, 'discredit'), dp = since(t, 'dispute');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.04), 640, 400);
    shape(ctx, '#3a4a5a', 0, rect(-400, -300, 1040 + 400, 1300)); shape(ctx, '#3a2430', 0, rect(640, -300, 1100, 1300));
    const pt = FX.settle(clamp(lt / .4));
    [['bowler', 'overcoat', 140], ['cloche', 'dress20s', 300], ['professor', 'greySuit', 460]].forEach(([h, o, x], i) =>
      fig(ctx, x, 720, .34, cast(h, o, { hands: { L: [-120, -480], R: [lerp(120, 460, pt), lerp(-480, -1000, pt)] }, handShape: { R: 'point' }, face: { brows: 'worried', mouth: i === 1 ? 'o' : 'grit', look: [.8, 0], eyes: blink(t, at('supporters') + 1 + i * .6) } }), { mirror: true }));
    const back = FX.settle(clamp(ds / .4));
    fig(ctx, 960, 720, .36, houdini({ hands: { L: [-120, -470], R: ds > 0 ? [lerp(120, 460, back), lerp(-480, -1000, back)] : [120, -470] }, handShape: { R: ds > 0 ? 'point' : 'open' }, face: { brows: ds > 0 ? 'strain' : 'up', mouth: ds > 0 ? 'grit' : 'o', look: [.7, 0], eyes: blink(t, at('supporters') + 2.2) }, breathe: breathe(t) }));
    line(ctx, [[640, -100], [640, 800]], 8, PAPER);
    ctx.restore();
    bubble(ctx, 330, 80, 420, 90, 330, 190, lt - .3, { text: 'HOUDINI PLANTED IT!', font: FX.DISPLAY(32) });
    if (ds > 0) bubble(ctx, 960, 80, 460, 90, 960, 190, ds, { text: 'PLANTED TO FRAME ME!', font: FX.DISPLAY(32), color: RED });
    if (dp > 0) { FX.stamp(ctx, 'NEVER RESOLVED', 640, 420, dp, { color: GOLD, size: 56, rot: -.06 }); }
    FX.caption(ctx, "MARGERY'S SUPPORTERS  vs.  HOUDINI", lt, .3);
    FX.vignette(ctx, 640, 380, .5);
  }
  function b13(ctx, lt, dur, t) { // what was resolved: no prize
    const p = since(t, 'prize');
    FX.darkBg(ctx, '#2a2622');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    cheque(ctx, 640, 380, 1.3, -.04);
    FX.stamp(ctx, 'NOT AWARDED', 700, 400, p, { color: RED, size: 70, rot: -.14 });
    ctx.restore();
    FX.caption(ctx, 'MARGERY DID NOT GET THE PRIZE', p + .3, 0);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1925');
  }
  function b14(ctx, lt, dur, t) { // Houdini's pamphlet exposing her "tricks"
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 380);
    const k = lt - .25;
    if (k > 0) { ctx.save(); ctx.translate(560, 380); ctx.rotate(-.04); ctx.scale(slam(k), slam(k));
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-214, -284, 440, 580);
      shape(ctx, '#e6d39a', 4, rect(-220, -290, 440, 580, 3)); shape(ctx, null, 2.5, rect(-200, -270, 400, 540, 2));
      ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = FX.DISPLAY(64); ctx.fillText('HOUDINI', 0, -200);
      ctx.font = FX.FONT(700, 26); ['EXPOSES THE TRICKS', 'USED BY THE', 'BOSTON MEDIUM'].forEach((s, i) => ctx.fillText(s, 0, -120 + i * 36));
      FX.bigText(ctx, '"MARGERY"', 0, 20, 58, { color: RED });
      ctx.save(); ctx.beginPath(); ctx.rect(-90, 70, 180, 170); ctx.clip(); shape(ctx, '#cfc4aa', 3, rect(-90, 70, 180, 170)); fig(ctx, 0, 470, .28, houdini({ face: { brows: 'smug', mouth: 'smirk', look: [-.4, 0] } }), { filter: 'grayscale(1) contrast(1.1)' }); ctx.restore(); shape(ctx, null, 3, rect(-90, 70, 180, 170));
      ctx.font = FX.FONT(600, 16); ctx.fillText('1924', 0, 260);
      ctx.restore(); }
    ctx.restore();
    FX.caption(ctx, 'WHAT HE CALLED HER TRICKS', lt, 1.2);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1924');
  }
  function b15(ctx, lt, dur, t) { // in the séance room, Walter's voice turned on him
    const on = since(t, 'turnedOn');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 380);
    seanceRoom(ctx, t, { light: .55, people: () => {
      fig(ctx, 420, 900, .42, margery({ hands: { L: [-170, -700], R: [170, -700] }, face: { eyes: 0, brows: 'calm', mouth: 'flat' } }));
      fig(ctx, 880, 900, .44, houdini({ hands: { L: [110, -760], R: [-110, -740] }, face: { brows: on > 0 ? 'strain' : 'calm', mouth: 'flat', look: on > 0 ? [.2, -.9] : [.7, 0], eyes: blink(t, at('turned') + 1.4) } }), { mirror: true });
    } });
    ctx.restore();
    // the voice bubble swings from the room toward Houdini and turns red
    const k = ease.inOut(clamp((on + .6) / .8)), wob = Math.sin(lt * 4) * 5, red = clamp(on / .4);
    glow(ctx, lerp(640, 860, k), 170, 240, `rgba(${lerp(180, 255, red)},${lerp(200, 90, red)},${lerp(255, 80, red)},.25)`);
    bubble(ctx, lerp(640, 820, k), 170 + wob, 320, 100, lerp(600, 880, k), 330, lt - .2, { text: on > 0 ? 'HOUDINI…' : '…', fill: red > .5 ? '#f6d4cc' : '#e8eeff', color: red > .5 ? RED : INK });
    bpText(ctx, '"WALTER"', lerp(640, 820, k), 80 + wob, 22, red > .5 ? '#ffb0a0' : '#cfe0ff', 'center');
    FX.caption(ctx, "WALTER'S VOICE TURNED ON HIM", on + .2, 0);
    FX.vignette(ctx, 640, 380, .7);
    FX.dateTag(ctx, 'BOSTON, 1924');
  }
  function b16(ctx, lt, dur, t) { // the newspaper column: Walter predicts Houdini will be dead within a year
    const d = since(t, 'dead');
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, lerp(1, 1.18, ease.inOut(clamp(d / 1.2))), 640, 440);
    const k = lt - .25;
    if (k > 0) newspaper(ctx, 640, 380, 620, 560, { mast: 'BOSTON EVENING BUGLE', date: '1924', head: ["'WALTER' PREDICTS", 'HOUDINI WILL BE', 'DEAD WITHIN A YEAR'], hs: 42, rot: -.02, scale: slam(k), seed: 41 });
    if (d > 0) { ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = '#f6e04a'; ctx.translate(640, 380); ctx.rotate(-.02); ctx.fillRect(-250, -90, 500 * ease.out(clamp(d / .5)), 46); ctx.restore(); }
    ctx.restore();
    FX.caption(ctx, 'ACCORDING TO SEVERAL ACCOUNTS', lt, .5, W - 60, 40);
    FX.vignette(ctx, 640, 380, .55);
    FX.dateTag(ctx, '1924 – 1925');
  }
  function b17(ctx, lt, dur, t) { // the details change: date, wording, who made it public
    FX.darkBg(ctx, '#2a2622');
    const versions = [['1924', '"DEAD IN A YEAR"', 'WALTER, AT A SITTING'], ['1925', '"WITHIN TWELVE MONTHS"', 'A SITTER, TO THE PRESS'], ['?', '"HIS DAYS ARE SHORT"', 'HOUDINI HIMSELF?']];
    const rows = [['date', 'DATE'], ['wording', 'WORDING'], ['who', 'WHO TOLD IT']];
    versions.forEach((v, i) => {
      const k = lt - .15 - i * .25; if (k <= 0) return;
      const x = 250 + i * 390, rot = [-.04, .02, -.02][i];
      ctx.save(); ctx.translate(x, 390); ctx.rotate(rot); ctx.scale(slam(k), slam(k));
      FX.paperDoc(ctx, 0, 0, 330, 440, { lines: 0, fill: '#ebe4d0', draw: c => {
        c.fillStyle = INK; c.textAlign = 'center'; c.font = `700 22px Georgia, serif`; c.fillText(`TELLING No. ${i + 1}`, 0, -180); line(c, [[-140, -160], [140, -160]], 2.5);
        rows.forEach(([key, name], r) => { const y = -110 + r * 110, hi = since(t, key) > 0 && (r === 2 || since(t, rows[r + 1][0]) < 0);
          if (hi) { c.save(); c.globalAlpha = .35; c.fillStyle = '#f6e04a'; c.fillRect(-150, y - 6, 300, 66); c.restore(); }
          c.font = FX.FONT(600, 15); c.fillStyle = '#6a5a4a'; c.fillText(name, 0, y + 8); c.font = FX.FONT(700, r === 0 ? 34 : 19); c.fillStyle = INK; c.fillText(v[r], 0, y + 42); });
      } });
      ctx.restore();
    });
    FX.caption(ctx, 'THE DETAILS CHANGE FROM TELLING TO TELLING', lt, .6, W - 60, 40);
  }
  function b18(ctx, lt, dur, t) { // a historian argues Houdini helped spread it: excellent publicity
    const pb = since(t, 'publicity');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.06), 640, 400);
    shape(ctx, '#3a3a40', 0, rect(-400, -300, 2100, 1300));
    // a theatre marquee whose bulbs chase, lighting fully on "publicity"
    shape(ctx, '#7a2621', 5, rect(200, 30, 880, 170, 8)); shape(ctx, '#f1ead8', 4, rect(240, 60, 800, 110, 4));
    for (let i = 0; i < 40; i++) { const x = 214 + i * 22, on = pb > 0 ? 1 : (i + Math.floor(lt * 10)) % 3 === 0; for (const y of [44, 186]) { shape(ctx, on ? '#ffe9a8' : '#6a5a40', 2, circle(x, y, 6)); if (on) glow(ctx, x, y, 16, 'rgba(255,230,160,.4)'); } }
    ctx.fillStyle = INK; ctx.font = FX.DISPLAY(50); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('HOUDINI — DEAD IN A YEAR?', 640, 118);
    shape(ctx, '#2a2a2e', 0, rect(-400, 600, 2100, 400));
    // Houdini hands out the papers with a sly smile
    const hand = Math.max(0, Math.sin(lt * 2.2));
    const HS = .32, HX = 520, HY = 712, held = [lerp(160, 360, hand), lerp(-620, -760, hand)];
    fig(ctx, HX, HY, HS, houdini({ hands: { L: [-120, -640], R: held }, face: { brows: 'smug', mouth: 'smirk', look: [-.6, 0], eyes: L3.blink(t, at('historian') + 2) }, breathe: breathe(t) }));
    shape(ctx, '#ebe4d0', 3, rect(HX - 120 * HS - 40, HY - 640 * HS - 26, 80, 52, 2));                                            // the stack under his arm
    { ctx.save(); ctx.translate(HX + held[0] * HS + 24, HY + held[1] * HS - 6); ctx.rotate(-.2); shape(ctx, '#ebe4d0', 3, rect(-40, -26, 80, 52, 2)); line(ctx, [[-30, -12], [30, -12]], 3, 'rgba(70,64,58,.5)'); ctx.restore(); }   // the copy he hands out
    for (const [x, h, o, m] of [[860, 'bowler', 'overcoat', true], [1040, 'cloche', 'dress20s', true]]) fig(ctx, x, 712, .3, cast(h, o, { hands: { L: [-120, -480], R: [130, -640] }, face: { brows: 'up', mouth: 'o', look: [.6, .3] } }), { mirror: m });
    ctx.restore();
    if (pb > 0) FX.stamp(ctx, 'EXCELLENT PUBLICITY', 900, 470, pb, { color: GOLD, size: 46, rot: .06 });
    FX.caption(ctx, 'ONE HISTORIAN ARGUES HOUDINI HELPED SPREAD IT', lt, .4);
    FX.vignette(ctx, 640, 400, .55);
    FX.dateTag(ctx, '1925');
  }
  function b19(ctx, lt, dur, t) { // either way, a prophecy of his death was now on the record
    const r = since(t, 'record');
    FX.darkBg(ctx, '#2a2420');
    ctx.save(); cam(ctx, FX.push(lt, dur, 1, 1.08), 640, 380);
    // a case file: the clipping clipped inside
    shape(ctx, '#c9a96a', 5, rect(240, 150, 560, 440, 8)); shape(ctx, '#d8b878', 5, rect(240, 130, 220, 40, 6));
    bpText(ctx, 'FILE: HOUDINI', 350, 150, 22, INK, 'center');
    newspaper(ctx, 520, 380, 420, 360, { mast: 'BOSTON EVENING BUGLE', date: '1924', head: ['DEAD WITHIN', 'A YEAR'], hs: 40, rot: .03, seed: 51 });
    shape(ctx, '#9aa3a8', 3, rect(500, 180, 40, 18, 4));
    // the clock on the wall, ticking toward the end of the year
    const sec = Math.floor(lt); shape(ctx, '#6b4f39', 4, circle(1020, 280, 120)); shape(ctx, PAPER, 3.5, circle(1020, 280, 104));
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; line(ctx, [[1020 + Math.sin(a) * 88, 280 - Math.cos(a) * 88], [1020 + Math.sin(a) * 98, 280 - Math.cos(a) * 98]], 4); }
    const ma = sec / 60 * Math.PI * 2 * 5; line(ctx, [[1020, 280], [1020 + Math.sin(ma) * 80, 280 - Math.cos(ma) * 80]], 4, RED); line(ctx, [[1020, 280], [1020 + Math.sin(2.2) * 54, 280 - Math.cos(2.2) * 54]], 7);
    ctx.restore();
    FX.stamp(ctx, 'ON THE RECORD', 560, 560, r, { color: RED, size: 62, rot: -.1 });
    FX.vignette(ctx, 640, 380, .6);
    FX.dateTag(ctx, '1925');
    T.fill(ctx, '#000', ease.in(prog(lt, dur - .9, dur)));
  }

  // ---------- timeline ----------
  const S = P3;
  const cut = [
    ['s1', S.s1], ['champion', S.s2], ['y1916', S.s3], ['believed', S.s4], ['met', S.s5], ['disagreed', S.s6], ['june', S.s7], ['jean', S.s8], ['medium', S.s9],
    ['offered', S.s10], ['agreed', S.s11], ['trance', S.s12], ['loving', S.s13], ['read', S.s14], ['fluent', S.s15], ['cross', S.s16], ['birthday', S.s17],
    ['cheating', S.s18], ['troubled', S.s19], ['honest', S.s20], ['public', S.s21], ['recovered', S.s22], ['doubter', S.s23],
    ['chapter2', b0], ['sciam', b1], ['convince', b2], ['mina', b3], ['darkened', b4], ['bells', b5], ['july', b6], ['bellbox', b7], ['beside', b8], ['felt', b9],
    ['cabinet', b10], ['sitting', b11], ['supporters', b12], ['resolved', b13], ['pamphlet', b14], ['turned', b15], ['according', b16], ['details', b17], ['historian', b18], ['either', b19],
  ];
  A.chapter2 = A.opponent + .75;                       // the pause after "opponent" carries the chapter card
  const DURATION = A.end + 1.5;
  const shots = cut.map(([k, draw], i) => ({ start: i ? A[k] - .15 : 0, end: i + 1 < cut.length ? A[cut[i + 1][0]] - .15 : DURATION, draw }));
  const sfx = [
    { t: A.detective + .4, type: 'whoosh', gain: .5 }, { t: A.y1916 + .25, type: 'paper' }, { t: A.y1916 + .3, type: 'thud', gain: .6 },
    { t: A.met + 1.25, type: 'thud', gain: .35 }, { t: A.friends, type: 'thud' }, { t: A.disagreed + .3, type: 'swell', gain: .3 }, { t: A.civil, type: 'click', gain: .4 },
    { t: A.ambassador, type: 'click', gain: .5 }, { t: A.automatic, type: 'thud', gain: .6 }, { t: A.spirit, type: 'swell', gain: .6 }, { t: A.mother, type: 'swell', gain: .4 },
    ...[0, 1, 2, 3, 4, 5, 6].map(i => ({ t: A.trance + 1.2 + i * .9, type: 'scratch', gain: .45 })), ...[0, 1, 2, 3].map(i => ({ t: A.page + i * .55, type: 'paper', gain: .5 })),
    { t: A.hold, type: 'paper', gain: 1 }, { t: A.little + .9, type: 'hit', gain: .5 }, { t: A.cross + 1.1, type: 'scratch', gain: .4 }, { t: A.devout + 1.6, type: 'hit', gain: .4 },
    { t: A.never + 1.2, type: 'thud' }, { t: A.cheating + .9, type: 'hit', gain: .4 }, { t: A.sincere + .5, type: 'click', gain: .5 },
    { t: A.honest + 2.4, type: 'thud', gain: .7 }, { t: A.grief - .6, type: 'thud', gain: .7 },
    { t: A.public + .2, type: 'paper' }, { t: A.defended, type: 'paper' }, { t: A.recovered + .5, type: 'paper', gain: 1 }, { t: A.opponent, type: 'whoosh', gain: .6 },
    { t: A.chapter2 + .5, type: 'clang', gain: .5 }, { t: A.offered2, type: 'slide', gain: .6 }, { t: A.sat, type: 'swell', gain: .4 }, { t: A.margery, type: 'paper' },
    { t: A.darkened + 1.8, type: 'swell', gain: .5 }, { t: A.swore, type: 'hit', gain: .4 }, { t: A.orders, type: 'thud', gain: .6 },
    ...[0, 1, 2, 3].map(i => ({ t: A.bells + .1 + i * .35, type: 'click', gain: .7 })), { t: A.objects, type: 'creak', gain: .6 },
    { t: A.july + .3, type: 'wind', gain: .3 }, { t: A.pressure, type: 'click' }, { t: A.pressure + .8, type: 'click' }, { t: A.foot, type: 'click' },
    { t: A.cabinet + 1.2, type: 'slide' }, { t: A.cabinet + 2.1, type: 'click' }, { t: A.cabinet + 2.2, type: 'click', gain: .8 },
    { t: A.ruler, type: 'swell', gain: .4 }, { t: A.exactly + 1.2, type: 'click' }, { t: A.dispute, type: 'thud' },
    { t: A.prize, type: 'thud' }, { t: A.pamphlet + .25, type: 'paper' }, { t: A.pamphlet + .3, type: 'thud', gain: .6 },
    { t: A.turnedOn, type: 'boom', gain: .5 }, { t: A.according + .25, type: 'paper' }, ...[0, 1, 2].map(i => ({ t: A.details + .15 + i * .25, type: 'paper', gain: .6 })),
    { t: A.publicity, type: 'thud' }, { t: A.record, type: 'thud' },
  ];
  const moods = [
    { t: 0, mood: 'still' }, { t: A.medium, mood: 'mystery' }, { t: A.read, mood: 'still' }, { t: A.public, mood: 'tense' }, { t: A.chapter2, mood: 'still' },
    { t: A.darkened, mood: 'mystery' }, { t: A.july, mood: 'still' }, { t: A.supporters, mood: 'tense' }, { t: A.resolved, mood: 'still' }, { t: A.turned, mood: 'mystery' }, { t: A.according, mood: 'tense' },
  ];
  G.Show = {
    duration: DURATION, narration: 'assets/audio/narration-part3.mp3', shots, sfx, moods,
    images: { bed: 'assets/img/houdini-bed.png', suit: 'assets/img/houdini-suit.png', suitEyeL: 'assets/img/rig/suit-eye-l.png', suitEyeR: 'assets/img/rig/suit-eye-r.png', bedEyeL: 'assets/img/rig/bed-eye-l.png', bedEyeR: 'assets/img/rig/bed-eye-r.png' },
    fonts: ['600 26px Fredoka', '700 20px Fredoka', '40px "Luckiest Guy"'],
  };
})(window);
