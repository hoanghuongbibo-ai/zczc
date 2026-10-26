/* "It's About Salt" — cast + costumes for the history of salt (loads after toilet/js/cast.js, which gives the Viewer etc).
 * Outfits: hanRobe(col,trim) wide-sleeved Han robes (Emperor Wu, Sang Hongyang, Huan Kuan, scholars, salt merchant),
 *   peasantFR (smock + sabots), gabelou (French salt police: blue coat, red cuffs, white cross-belt), smuggler (dark cloak),
 *   dhoti (Gandhi: white dhoti + shawl over one shoulder, bare shins), kurta (Salt March volunteers),
 *   bluejacket (Union cavalry shell jacket, sky-blue trousers), officerBlue (Union general's frock + shoulder straps),
 *   butternut (Confederate militia), miner (Bronze Age Hallstatt miner: wool tunic, leather cape), hivis (plough driver).
 * Hats: mianguan (emperor's flat board crown with bead strings), guan (Han official's black cap), tricorne, kepi,
 *   slouch, gandhiCap, furCap (miner's pointed fur cap), beanie.
 * Props: staff (walking stick), saltSack, coins, scroll, antlerPick, torch (pine-splint torch).
 * G.shaker(ctx, x, y, s, o): the SALT SHAKER character — o.turn (0 side-on → 1 facing us), o.face, o.glasses, o.coat, o.talk. */
(function (G) {
  'use strict';
  const Gd = G.Guide, { path, seg, curve, bodyPath, garment } = Gd.kit, O = Gd.OUTFITS, H = Gd.HATS, PR = Gd.PROPS, TAU = Math.PI * 2, PI = Math.PI;
  const mul = (h, k) => Gd.hexMul(h, k);

  // ---------- Han dynasty robes: crossed collar (left over right), wide sleeves, sash, floor-length skirt ----------
  const hanRobe = (col, trim, sash = '#1e1a18') => ({ hat: 'guan', arm: { sleeve: col, w: 40, wide: true, cuff: trim }, legs: { kind: 'none' }, feet: 'slippers', shoe: '#2a2420',
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-62 * nar, -200); c.lineTo(62 * nar, -200); c.quadraticCurveTo(96 * nar, -90, 104 * nar, -6); c.lineTo(-104 * nar, -6); c.quadraticCurveTo(-96 * nar, -90, -62 * nar, -200); c.closePath(); }, col, 'rgba(0,0,0,.25)',
        c2 => { c2.fillStyle = trim; c2.fillRect(-120, -26, 240, 20); c2.strokeStyle = 'rgba(0,0,0,.18)'; c2.lineWidth = 2.5; for (const x of [-60, -24, 12, 48]) { c2.beginPath(); c2.moveTo(x * .6, -190); c2.lineTo(x, -30); c2.stroke(); } }); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -196, 1.12), col, 'rgba(0,0,0,.25)'); if (B.back) return;
      seg(ctx, [[vx + 30, top - 2], [vx - 36, top + 96]], 16, trim); seg(ctx, [[vx - 26, top - 2], [vx - 4, top + 40]], 12, trim);   // crossed collar
      path(ctx, c => c.rect(-70 * nar, -226, 140 * nar, 30), sash, 3.5); seg(ctx, [[vx + 14, -200], [vx + 20, -140]], 8, sash); } });
  O.hanEmperor = Object.assign(hanRobe('#1e1c22', '#c8322a', '#d8a83a'), { hat: 'mianguan' });
  O.hanRed = hanRobe('#8a2a22', '#e2c27a'); O.hanBlue = hanRobe('#2a3e5e', '#d8c8a0'); O.hanScholar = hanRobe('#e8dfc8', '#3a3a3a', '#5a4a3a'); O.hanMerchant = hanRobe('#7a5a2e', '#c8a050', '#3a2a18');
  H.mianguan = { draw(ctx, hc) { const x = (hc.hx || 0) * .5;   // flat board crown with hanging bead strings, front and back
    path(ctx, c => c.roundRect(x - 54, -176, 108, 70, 18), '#1a1816', 4); path(ctx, c => { c.moveTo(x - 150, -196); c.lineTo(x + 150, -196); c.lineTo(x + 140, -176); c.lineTo(x - 140, -176); c.closePath(); }, '#1a1816', 4);
    seg(ctx, [[x - 150, -192], [x + 150, -192]], 3, '#c8322a'); for (const sd of [-1, 1]) for (let i = 0; i < 5; i++) { const bx = x + sd * (96 + i * 12); seg(ctx, [[bx, -176], [bx, -120]], 2, '#d8a83a'); for (let k = 0; k < 4; k++) path(ctx, c => c.arc(bx, -168 + k * 14, 4, 0, TAU), k % 2 ? '#e2d8c0' : '#3aa07a', 1.5); }
    path(ctx, c => c.rect(x - 8, -150, 16, 40), '#d8a83a', 2.5); } };
  H.guan = { draw(ctx, hc) { const x = (hc.hx || 0) * .5;   // small black official's cap over a top-knot, tied under the chin
    path(ctx, c => { c.moveTo(x - 50, -150); c.quadraticCurveTo(x - 46, -214, x + 4, -220); c.quadraticCurveTo(x + 50, -214, x + 54, -150); c.closePath(); }, '#1a1816', 4);
    seg(ctx, [[x - 40, -168], [x + 44, -168]], 3, '#3a3634'); path(ctx, c => c.rect(x - 4, -228, 8, 64), '#5a4a3a', 2.5); } };

  // ---------- France: peasant, salt police (gabelou), smuggler ----------
  O.peasantFR = { hat: 'beanie', arm: { sleeve: '#c8b48a', w: 30, roll: true, rollC: '#b8a276' }, legs: { kind: 'trousers', c: '#6a5a44' }, feet: 'boots', boot: '#7a5a34',
    torso(ctx, B) { const { top, vx } = B; garment(ctx, B, bodyPath(B, -120, 1.12), '#c8b48a', 'rgba(60,40,10,.22)', c2 => { c2.strokeStyle = 'rgba(90,60,30,.3)'; c2.lineWidth = 2; for (let x = -80; x < 90; x += 14) { c2.beginPath(); c2.moveTo(x, top + 40); c2.lineTo(x * 1.1, -124); c2.stroke(); } }); if (B.back) return;
      path(ctx, c => c.ellipse(vx, top + 8, 26, 10, 0, 0, TAU), '#e8dcc0', 3); path(ctx, c => c.rect(-64, -190, 128, 10), '#5a3a22', 3); } };
  O.gabelou = { hat: 'tricorne', arm: { sleeve: '#2a3e7a', w: 32, cuff: '#b8322a' }, legs: { kind: 'breeches', c: '#e8dcc0', sock: '#f2ece0' }, feet: 'boots', boot: '#1e1a18',
    behind(ctx, B) { if (B.back) return; const { top, nar } = B; path(ctx, c => { c.moveTo(-64 * nar, top + 20); c.lineTo(64 * nar, top + 20); c.lineTo(80 * nar, -90); c.lineTo(-80 * nar, -90); c.closePath(); }, '#22336a', 4); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -150, 1.04), '#2a3e7a', 'rgba(0,0,30,.3)'); if (B.back) return;
      seg(ctx, [[vx - 50 * nar, top + 10], [vx + 52 * nar, -190]], 12, '#f4f1ea'); for (let i = 0; i < 5; i++) path(ctx, c => c.arc(vx + 34, top + 30 + i * 24, 4.5, 0, TAU), '#e2c27a', 2);
      for (const sd of [-1, 1]) path(ctx, c => c.rect(vx + sd * 40 - 12, top + 2, 24, 12), '#b8322a', 2.5); } };
  O.smuggler = { hat: 'beanie', arm: { sleeve: '#3a3632', w: 30 }, legs: { kind: 'trousers', c: '#4a4038' }, feet: 'boots', boot: '#2a2018',
    behind(ctx, B) { const { top, nar } = B; path(ctx, c => { c.moveTo(-70 * nar, top + 6); c.lineTo(70 * nar, top + 6); c.lineTo(92 * nar, -60); c.lineTo(-92 * nar, -60); c.closePath(); }, '#2a2622', 4); },
    torso(ctx, B) { const { top, vx } = B; garment(ctx, B, bodyPath(B, -150, 1.06), '#5a5046', 'rgba(0,0,0,.3)'); if (B.back) return; path(ctx, c => c.rect(-62, -196, 124, 12), '#2a1a10', 3); } };
  H.tricorne = { hideTufts: false, draw(ctx, hc) { const x = (hc.hx || 0) * .5;
    path(ctx, c => { c.moveTo(x - 150, -120); c.quadraticCurveTo(x - 60, -150, x, -212); c.quadraticCurveTo(x + 60, -150, x + 150, -120); c.quadraticCurveTo(x, -96, x - 150, -120); c.closePath(); }, '#1e1c22', 4.5);
    curve(ctx, [x - 140, -122], [x, -104], [x + 140, -122], 4, '#d8b04a'); path(ctx, c => c.arc(x + 70, -134, 10, 0, TAU), '#e8dcc0', 2.5); } };
  H.beanie = { draw(ctx, hc) { const x = (hc.hx || 0) * .5, col = hc.col || '#7a3a2a';
    path(ctx, c => { c.moveTo(x - 104, -116); c.quadraticCurveTo(x - 100, -230, x + 10, -232); c.quadraticCurveTo(x + 110, -226, x + 106, -116); c.closePath(); }, col, 4.5); path(ctx, c => c.roundRect(x - 110, -132, 220, 28, 10), mul(col, .8), 4); } };

  // ---------- India 1930: Gandhi (dhoti + shawl), volunteers (kurta + Gandhi cap) ----------
  O.dhoti = { hat: 'none', arm: { bare: true, w: 26 }, legs: { kind: 'bare' }, feet: 'slippers', shoe: '#8a6a44',
    legsOver(ctx, B) { const { nar } = B; garment(ctx, B, c => { c.moveTo(-60 * nar, -200); c.lineTo(60 * nar, -200); c.lineTo(64 * nar, -96); c.quadraticCurveTo(0, -76, -64 * nar, -96); c.closePath(); }, '#f4f1e8', 'rgba(80,70,50,.18)',
        c2 => { c2.strokeStyle = 'rgba(120,110,90,.35)'; c2.lineWidth = 2.5; for (const x of [-30, 0, 26]) { c2.beginPath(); c2.moveTo(x, -196); c2.quadraticCurveTo(x + 6, -150, x - 4, -90); c2.stroke(); } }); },
    torso(ctx, B) { const { top, nar, vx } = B; garment(ctx, B, bodyPath(B, -196, .96), Gd.C.face, 'rgba(0,0,0,.2)'); if (B.back) return;
      garment(ctx, B, c => { c.moveTo(-58 * nar, top + 4); c.lineTo(-10 * nar, top - 4); c.lineTo(60 * nar, -150); c.lineTo(20 * nar, -150); c.quadraticCurveTo(-40 * nar, -180, -64 * nar, -130); c.closePath(); }, '#f4f1e8', 'rgba(80,70,50,.2)'); } };
  O.kurta = { hat: 'gandhiCap', arm: { sleeve: '#f2efe4', w: 30 }, legs: { kind: 'trousers', c: '#e8e2d2' }, feet: 'slippers', shoe: '#8a6a44',
    torso(ctx, B) { const { top, vx } = B; garment(ctx, B, bodyPath(B, -96, 1.08), '#f2efe4', 'rgba(80,70,50,.2)'); if (B.back) return; seg(ctx, [[vx, top + 4], [vx, top + 70]], 3, 'rgba(120,110,90,.6)'); } };
  H.gandhiCap = { draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => { c.moveTo(x - 96, -140); c.lineTo(x + 96, -140); c.lineTo(x + 84, -196); c.quadraticCurveTo(x, -186, x - 84, -196); c.closePath(); }, '#fbfaf4', 4); seg(ctx, [[x - 90, -160], [x + 90, -160]], 2, 'rgba(120,110,90,.5)'); } };

  H.specs = { draw(ctx, hc) { const x = (hc.hx || 0) * .6, y = hc.ey ?? 6; ctx.save(); ctx.lineWidth = 5; ctx.strokeStyle = '#2a2420';   // round wire glasses (Gandhi, Dr Cowie)
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(x + sd * 34, y, 22, 0, TAU); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 12, y - 4); ctx.quadraticCurveTo(x, y - 10, x + 12, y - 4); ctx.stroke(); ctx.restore(); } };

  // ---------- US Civil War ----------
  O.bluejacket = { hat: 'kepi', arm: { sleeve: '#26365e', w: 32, cuff: '#26365e' }, legs: { kind: 'trousers', c: '#7a98c0' }, feet: 'boots', boot: '#1e1a18',
    torso(ctx, B) { const { top, vx } = B; garment(ctx, B, bodyPath(B, -176, 1.04), '#26365e', 'rgba(0,0,30,.3)'); if (B.back) return;
      for (let i = 0; i < 6; i++) path(ctx, c => c.arc(vx, top + 24 + i * 22, 4.5, 0, TAU), '#e2c27a', 2); seg(ctx, [[-64, -186], [64, -186]], 10, '#2a1a10'); path(ctx, c => c.rect(vx - 14, -194, 28, 16), '#c8a24a', 2.5);
      seg(ctx, [[vx - 50, top + 6], [vx + 50, -190]], 7, '#e2c27a'); } };
  O.officerBlue = Object.assign({}, O.frockNavy, { hat: 'slouch', arm: { sleeve: '#26365e', w: 32, cuff: '#26365e' } });
  { const t0 = O.officerBlue.torso; O.officerBlue.torso = (ctx, B) => { t0(ctx, B); if (B.back) return; const { top, nar } = B; for (const sd of [-1, 1]) { path(ctx, c => c.rect(sd * 62 * nar - 18, top + 2, 36, 14), '#e2c27a', 2.5); path(ctx, c => c.arc(sd * 62 * nar, top + 9, 4, 0, TAU), '#f4f1ea', 1.5); } }; }
  O.butternut = { hat: 'slouch', arm: { sleeve: '#a8885a', w: 32 }, legs: { kind: 'trousers', c: '#6a6458' }, feet: 'boots', boot: '#3a2618',
    torso(ctx, B) { const { top, vx } = B; garment(ctx, B, bodyPath(B, -170, 1.06), '#a8885a', 'rgba(40,30,10,.3)'); if (B.back) return; for (let i = 0; i < 4; i++) path(ctx, c => c.arc(vx, top + 30 + i * 24, 4, 0, TAU), '#6a5a3a', 2); } };
  H.kepi = { draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => { c.moveTo(x - 92, -120); c.lineTo(x - 70, -220); c.quadraticCurveTo(x, -236, x + 70, -224); c.lineTo(x + 92, -120); c.closePath(); }, '#26365e', 4.5);
    path(ctx, c => { c.moveTo(x - 30, -120); c.quadraticCurveTo(x + 40, -96, x + 120, -112); c.lineTo(x + 92, -124); c.closePath(); }, '#1a1816', 3.5); seg(ctx, [[x - 90, -130], [x + 90, -130]], 4, '#e2c27a'); } };
  H.slouch = { draw(ctx, hc) { const x = (hc.hx || 0) * .5, col = hc.col || '#2a2622'; path(ctx, c => c.ellipse(x, -116, 170, 30, -.06, 0, TAU), col, 4.5);
    path(ctx, c => { c.moveTo(x - 90, -120); c.bezierCurveTo(x - 96, -230, x + 96, -230, x + 90, -120); c.closePath(); }, mul(col, 1.1), 4.5); seg(ctx, [[x - 90, -134], [x + 90, -134]], 8, '#c8a24a'); } };

  // ---------- Hallstatt Bronze Age miner; modern plough-truck driver ----------
  O.miner = { hat: 'furCap', arm: { sleeve: '#8a6a44', w: 30 }, legs: { kind: 'trousers', c: '#6a5038' }, feet: 'boots', boot: '#4a3020',
    behind(ctx, B) { const { top, nar } = B; path(ctx, c => { c.moveTo(-68 * nar, top + 4); c.lineTo(68 * nar, top + 4); c.lineTo(80 * nar, -140); c.lineTo(-80 * nar, -140); c.closePath(); }, '#5a3e26', 4); },
    torso(ctx, B) { const { top, vx } = B; garment(ctx, B, bodyPath(B, -120, 1.1), '#8a6a44', 'rgba(40,20,0,.3)', c2 => { c2.strokeStyle = 'rgba(60,40,20,.35)'; c2.lineWidth = 2; for (let y = top + 20; y < -120; y += 16) { c2.beginPath(); c2.moveTo(-90, y); c2.lineTo(90, y + 4); c2.stroke(); } }); if (B.back) return;
      path(ctx, c => c.rect(-64, -196, 128, 12), '#3a2a18', 3); } };
  H.furCap = { draw(ctx, hc) { const x = (hc.hx || 0) * .5; path(ctx, c => { c.moveTo(x - 104, -118); c.quadraticCurveTo(x - 80, -240, x + 6, -262); c.quadraticCurveTo(x + 80, -230, x + 106, -118); c.closePath(); }, '#7a5634', 4.5);
    path(ctx, c => c.roundRect(x - 112, -136, 224, 30, 12), '#a8865a', 4); ctx.save(); ctx.strokeStyle = 'rgba(60,40,20,.5)'; ctx.lineWidth = 2; for (let i = -100; i < 104; i += 10) { ctx.beginPath(); ctx.moveTo(x + i, -134); ctx.lineTo(x + i + 3, -110); ctx.stroke(); } ctx.restore(); } };
  O.hivis = Object.assign({}, O.hoodie, { hat: 'beanie' });
  { const t0 = O.hoodie.torso; O.hivis.torso = (ctx, B) => { t0(ctx, B); if (B.back) return; const { top, nar, vx } = B;
    garment(ctx, B, c => { c.moveTo(-58 * nar, top + 10); c.lineTo(vx - 20, top + 6); c.lineTo(vx - 18, -150); c.lineTo(-62 * nar, -150); c.closePath(); c.moveTo(58 * nar, top + 10); c.lineTo(vx + 20, top + 6); c.lineTo(vx + 18, -150); c.lineTo(62 * nar, -150); c.closePath(); }, '#e8f03a', 'rgba(80,80,0,.2)');
    for (const y of [-230, -190]) seg(ctx, [[-60 * nar, y], [60 * nar, y]], 8, '#c8ccd0'); }; }

  // ---------- props ----------
  PR.staff = { hand: 'hold', over(ctx, a) { const [x, y] = a.wr; seg(ctx, [[x + 4, y - 150], [x - 4, y + 200]], 13); seg(ctx, [[x + 4, y - 150], [x - 4, y + 200]], 7, '#b8925a'); } };
  PR.saltSack = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; path(ctx, c => { c.moveTo(x - 50, y - 10); c.quadraticCurveTo(x - 70, y + 90, x - 30, y + 110); c.lineTo(x + 50, y + 110); c.quadraticCurveTo(x + 80, y + 80, x + 46, y - 10); c.closePath(); }, '#d8c49a', 4);
    seg(ctx, [[x - 40, y - 4], [x + 40, y - 4]], 6, '#8a6a3a'); ctx.save(); ctx.fillStyle = '#5a4a3a'; ctx.font = '700 22px Fredoka'; ctx.textAlign = 'center'; ctx.fillText('SEL', x + 6, y + 64); ctx.restore(); } };
  PR.coins = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; for (let i = 0; i < 4; i++) path(ctx, c => c.ellipse(x + 20, y - 20 - i * 9, 22, 8, 0, 0, TAU), i % 2 ? '#d8b04a' : '#e8c45a', 2.5); } };
  PR.scroll = { hand: 'hold', handDir: 0, over(ctx, a) { const [x, y] = a.wr; ctx.save(); ctx.translate(x + 26, y - 30); ctx.rotate(-.2); path(ctx, c => c.rect(-60, -40, 120, 80), '#e8d8b0', 3.5); for (let i = 0; i < 4; i++) seg(ctx, [[-44, -24 + i * 16], [44, -24 + i * 16]], 2.5, '#5a4a3a');
    for (const sd of [-1, 1]) path(ctx, c => c.roundRect(sd * 62 - 8, -48, 16, 96, 6), '#8a5a2e', 3); ctx.restore(); } };
  PR.antlerPick = { hand: 'hold', over(ctx, a) { const [x, y] = a.wr; seg(ctx, [[x, y + 10], [x + 30, y - 120]], 16); seg(ctx, [[x, y + 10], [x + 30, y - 120]], 9, '#e2d2b0'); seg(ctx, [[x + 24, y - 96], [x - 30, y - 140]], 12); seg(ctx, [[x + 24, y - 96], [x - 30, y - 140]], 6, '#e2d2b0'); } };
  PR.torch = { hand: 'hold', over(ctx, a, sd, o) { const [x, y] = a.wr, t = (o && o.t) || 0; seg(ctx, [[x, y + 10], [x + 10, y - 110]], 10); seg(ctx, [[x, y + 10], [x + 10, y - 110]], 5, '#c8a060');
    const f = Math.sin(t * 12) * 4; path(ctx, c => { c.moveTo(x - 6, y - 110); c.quadraticCurveTo(x - 12 + f, y - 150, x + 10, y - 176); c.quadraticCurveTo(x + 30 - f, y - 146, x + 24, y - 110); c.closePath(); }, '#f6a23a', 2.5); path(ctx, c => c.ellipse(x + 10, y - 124, 8, 14, 0, 0, TAU), '#ffe27a', 0); } };

  // ---------- the SALT SHAKER: glass body full of salt, steel cap with holes, a face on the glass ----------
  G.shaker = function (ctx, x, y, s = 1, o = {}) { const turn = o.turn ?? 1, t = o.t || 0, face = o.face || 'smug'; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(30,20,10,.25)'; ctx.beginPath(); ctx.ellipse(0, 4, 74, 14, 0, 0, TAU); ctx.fill();
    path(ctx, c => { c.moveTo(-58, -6); c.quadraticCurveTo(-70, -120, -52, -196); c.lineTo(52, -196); c.quadraticCurveTo(70, -120, 58, -6); c.quadraticCurveTo(0, 6, -58, -6); c.closePath(); }, 'rgba(225,240,248,.95)', 4.5);
    ctx.save(); ctx.beginPath(); ctx.moveTo(-54, -10); ctx.quadraticCurveTo(-64, -80, -58, -120); ctx.lineTo(58, -120); ctx.quadraticCurveTo(64, -80, 54, -10); ctx.closePath(); ctx.clip();   // the salt inside
    ctx.fillStyle = '#ffffff'; ctx.fillRect(-70, -124, 140, 130); ctx.fillStyle = 'rgba(170,190,205,.55)'; for (let i = 0; i < 60; i++) { ctx.fillRect(-56 + (i * 37) % 112, -118 + (i * 23) % 110, 3, 3); } ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(-46, -180, 10, 150);
    path(ctx, c => c.roundRect(-58, -246, 116, 54, 18), '#c8ccd2', 4.5); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-46, -238, 30, 8);
    for (const [hx, hy] of [[-22, -232], [0, -236], [22, -232], [-11, -218], [11, -218]]) path(ctx, c => c.arc(hx, hy, 4, 0, TAU), '#5a5e66', 0);
    if (o.coat) { for (const sd of [-1, 1]) { path(ctx, c => { c.moveTo(sd * 14, -132); c.lineTo(sd * 62, -150); c.quadraticCurveTo(sd * 74, -70, sd * 64, -4); c.lineTo(sd * 18, 0); c.closePath(); }, '#fbfbf8', 4);   // a little lab coat wrapped round the jar
        path(ctx, c => { c.moveTo(sd * 14, -132); c.lineTo(sd * 46, -144); c.lineTo(sd * 26, -104); c.closePath(); }, '#e6e6e0', 3); } path(ctx, c => c.rect(30, -60, 26, 22), '#ecece6', 2.5); seg(ctx, [[36, -64], [38, -48]], 3, '#3a6ab0'); }
    if (turn > .2) { const fx = (1 - turn) * 30, sq = .4 + .6 * turn;   // the face swings round as he turns to camera
      const blink = (t % 3.7) < .12; for (const sd of [-1, 1]) { const ex = fx + sd * 22 * sq, ey = -78;
        path(ctx, c => c.ellipse(ex, ey, 13 * sq, blink ? 2 : 15, 0, 0, TAU), '#1e1a18', 0); if (!blink) path(ctx, c => c.arc(ex - 3, ey - 5, 4.5 * sq, 0, TAU), '#fff', 0);
        const bt = face === 'shock' ? -102 : face === 'smug' ? (sd > 0 ? -100 : -96) : -98; seg(ctx, [[ex - 14 * sq, bt + (face === 'smug' && sd < 0 ? 4 : 0)], [ex + 14 * sq, bt]], 4, '#1e1a18'); }
      const mx = fx, my = -42; ctx.lineCap = 'round';
      if (face === 'shock' || o.talk > .3) path(ctx, c => c.ellipse(mx, my, 12 * sq, 8 + (o.talk || .6) * 8, 0, 0, TAU), '#5a1e1a', 3);
      else { ctx.strokeStyle = '#1e1a18'; ctx.lineWidth = 4.5; ctx.beginPath(); if (face === 'smug') { ctx.moveTo(mx - 18 * sq, my); ctx.quadraticCurveTo(mx + 4, my + 10, mx + 22 * sq, my - 8); } else { ctx.moveTo(mx - 20 * sq, my - 4); ctx.quadraticCurveTo(mx, my + 14, mx + 20 * sq, my - 4); } ctx.stroke(); }
      ctx.fillStyle = 'rgba(240,120,120,.35)'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(fx + sd * 40 * sq, -58, 10, 6, 0, 0, TAU); ctx.fill(); }
      if (o.glasses) { ctx.strokeStyle = '#2a2420'; ctx.lineWidth = 4; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(fx + sd * 22 * sq, -78, 19, 0, TAU); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(fx - 4, -80); ctx.lineTo(fx + 4, -80); ctx.stroke(); } }
    ctx.restore(); };

  for (const k of ['hanEmperor', 'hanRed', 'hanBlue', 'hanScholar', 'hanMerchant', 'peasantFR', 'gabelou', 'smuggler', 'dhoti', 'kurta', 'bluejacket', 'officerBlue', 'butternut', 'miner', 'hivis'])
    if (!O[k + '@sit'] && G.SIT_TWIN) G.SIT_TWIN(k);

  // ---------- the cast ----------
  Object.assign(G.CW, {
    wudi:     { outfit: 'hanEmperor', hat: 'mianguan', look: { skin: '#eec49c', hairCol: '#1a1410', beard: 'moustache', beardCol: '#1a1410' } },
    sang:     { outfit: 'hanRed', hat: 'guan', prop: 'coins', look: { skin: '#e8bc94', hairCol: '#1a1410', beard: 'moustache', beardCol: '#1a1410' } },
    huan:     { outfit: 'hanBlue', hat: 'guan', prop: 'scroll', look: { skin: '#eec49c', hairCol: '#1a1410' } },
    scholar:  { outfit: 'hanScholar', hat: 'guan', look: { skin: '#eec49c', hairCol: '#5a5048', beard: 'full', beardCol: '#9a948a' } },
    merchant: { outfit: 'hanMerchant', hat: 'guan', look: { skin: '#e8bc94', hairCol: '#1a1410', beard: 'moustache', beardCol: '#1a1410', width: 1.2 } },
    hanAdv:   { outfit: 'hanBlue', hat: 'guan', prop: 'scroll', look: { skin: '#eec49c', hairCol: '#1a1410', beard: 'moustache', beardCol: '#1a1410' } },
    peasant:  { outfit: 'peasantFR', hat: 'beanie', look: { skin: '#f0c4a0', hairCol: '#6a4224', beard: 'stubble', beardCol: '#6a4224' } },
    taxman:   { outfit: 'gabelou', hat: 'tricorne', look: { skin: '#f2cfae', hairCol: '#e9e6de', nose: 'big' } },
    smuggler: { outfit: 'smuggler', hat: 'beanie', prop: 'saltSack', look: { skin: '#e8bc94', hairCol: '#2a1e16', beard: 'full', beardCol: '#2a1e16' } },
    noble:    { outfit: 'georgian', hat: 'periwig', look: { skin: '#f6dcc4', hairCol: '#e9e6de', width: 1.15 } },
    gandhi:   { outfit: 'dhoti', hat: 'specs', prop: 'staff', look: { skin: '#a8724a', hair: 'bald', hairCol: '#d8d4cc', glasses: true, ears: 'big' } },
    marcher:  { outfit: 'kurta', hat: 'gandhiCap', look: { skin: '#a06a42', hairCol: '#1a1410', beard: 'moustache', beardCol: '#1a1410' } },
    marcher2: { outfit: 'kurta', hat: 'gandhiCap', look: { skin: '#8a5a36', hairCol: '#1a1410' } },
    irwin:    { outfit: 'suit', hat: 'none', look: { skin: '#f2d0b4', hair: 'bald', hairCol: '#8a7a6a' } },
    jefferson:{ outfit: 'georgian', hat: 'none', look: { skin: '#f2cfae', hairCol: '#c8a07a' } },
    pliny:    { outfit: 'toga', hat: 'none', prop: 'scroll', look: { skin: '#e8b890', hair: 'bald', hairCol: '#8a8278', width: 1.15 } },
    legion:   { outfit: 'auxiliary', hat: 'galea', look: { skin: '#dca67c', hairCol: '#2a1e16' } },
    uscav:    { outfit: 'bluejacket', hat: 'kepi', look: { skin: '#6a4028', hairCol: '#1a1410', beard: 'stubble', beardCol: '#1a1410' } },
    uscav2:   { outfit: 'bluejacket', hat: 'kepi', look: { skin: '#5a3420', hairCol: '#1a1410', beard: 'moustache', beardCol: '#1a1410' } },
    burbridge:{ outfit: 'officerBlue', hat: 'slouch', look: { skin: '#f0c8a8', hairCol: '#5a3a22', beard: 'full', beardCol: '#5a3a22' } },
    stoneman: { outfit: 'officerBlue', hat: 'slouch', look: { skin: '#f0c8a8', hairCol: '#3a2a1e', beard: 'full', beardCol: '#3a2a1e' } },
    confed:   { outfit: 'butternut', hat: 'slouch', look: { skin: '#eec4a2', hairCol: '#4a3420', beard: 'full', beardCol: '#4a3420' } },
    cowie:    { outfit: 'eLab', hat: 'specs', look: { skin: '#f2cfae', hairCol: '#6a5a4a', glasses: true, beard: 'moustache', beardCol: '#6a5a4a' } },
    miner:    { outfit: 'miner', hat: 'furCap', prop: 'antlerPick', look: { skin: '#e8bc94', hairCol: '#6a4224', beard: 'full', beardCol: '#6a4224' } },
    miner2:   { outfit: 'miner', hat: 'furCap', prop: 'torch', look: { skin: '#f0c8a2', hair: 'long', hairCol: '#a0602a', lashes: true } },
    driver:   { outfit: 'hivis', hat: 'beanie', look: { skin: '#d8a27c', hairCol: '#2a1e16', beard: 'stubble', beardCol: '#2a1e16' } },
  });
})(window);

/* hat seating: these hats were drawn with their brims ~30–60 units too high — lower each onto the head */
(function (G) { const H = G.Guide.HATS;
  for (const [k, d] of [['guan', 62], ['kepi', 38], ['slouch', 36], ['tricorne', 36], ['beanie', 32], ['furCap', 34], ['gandhiCap', 54], ['mianguan', 44]]) { const h = H[k], f = h.draw;
    h.hideTufts = true; h.draw = (ctx, hc) => { ctx.save(); ctx.translate(0, d); f(ctx, hc); ctx.restore(); }; }
})(window);
