// node tools/_shotidx.mjs <page> <outDir> <idx,idx,…> [frac…] — stills of the given shot indices
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [page, outDir, list, ...frac] = process.argv.slice(2); const fr = frac.length ? frac.map(Number) : [.5];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 90000 });
for (const i of list.split(',').map(Number)) { const [a, z] = await p.evaluate(i => [Show.shots[i].start, Show.shots[i].end], i);
  for (const f of fr) { const u = await p.evaluate(t => { renderAt(t); return document.getElementById('stage').toDataURL('image/jpeg', .8); }, a + (z - a) * f);
    writeFileSync(`${outDir}/s${String(i).padStart(3, '0')}_${f}.jpg`, Buffer.from(u.split(',')[1], 'base64')); } }
await b.close();
