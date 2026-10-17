// per-shot render cost: node tools/_prof.mjs <episode.html>  → ms per frame at each shot's midpoint (2nd render, warm caches)
import { chromium } from 'playwright';
const [page] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
const res = await p.evaluate(() => Show.shots.map((s, i) => { const t = (s.start + s.end) / 2; renderAt(t); const t0 = performance.now(); renderAt(t + .05); renderAt(t + .1); const ms = (performance.now() - t0) / 2; document.getElementById('stage').getContext('2d').getImageData(0, 0, 1, 1); return [i + 1, s.start.toFixed(1), Math.round(ms)]; }));
console.log(res.filter(r => r[2] > 60).map(r => r.join(' ')).join('\n')); console.log('total avg', Math.round(res.reduce((a, r) => a + r[2], 0) / res.length), errs.slice(0, 3).join('\n')); await b.close();
