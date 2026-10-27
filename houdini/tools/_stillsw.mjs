// node tools/_stillsw.mjs <page> <outDir> <t0> <t1> [frac…] — stills of the shots that start inside [t0, t1)
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [page, outDir, a, z, ...frac] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
const shots = await p.evaluate(() => Show.shots.map(s => [s.start, s.end])); const fr = frac.length ? frac.map(Number) : [.6];
for (let i = 0; i < shots.length; i++) { if (shots[i][0] < +a || shots[i][0] >= +z) continue; for (const f of fr) { const t = shots[i][0] + (shots[i][1] - shots[i][0]) * f;
  const url = await p.evaluate(t => { renderAt(t); return document.getElementById('stage').toDataURL('image/jpeg', .85); }, t); writeFileSync(`${outDir}/s${String(i).padStart(3, '0')}_${f}.jpg`, Buffer.from(url.split(',')[1], 'base64')); } }
console.log(shots.length, 'shots total', errs.slice(0, 5).join('\n')); await b.close();
