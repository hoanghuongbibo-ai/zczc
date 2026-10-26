import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
// node tools/_shotat.mjs <page> <outDir> <shotIdx:lt> ...   (lt seconds from shot start)
const [page, outDir, ...specs] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 30000 });
for (const sp of specs) { let [i, lt] = sp.split(':'); lt = +lt; if (i[0] === 'L') i = await p.evaluate(n => { const tv = window.TV['L' + n]; let k = 0; Show.shots.forEach((s, j) => { if (s.start <= tv + .05) k = j; }); return k; }, i.slice(1)); else i = +i;
  const url = await p.evaluate(([i, lt]) => { renderAt(Show.shots[i].start + lt); return document.getElementById('stage').toDataURL('image/png'); }, [i, lt]);
  writeFileSync(`${outDir}/k${i}_${lt}.png`, Buffer.from(url.split(',')[1], 'base64')); }
console.log(errs.slice(0, 5).join('\n') || 'ok'); await b.close();
