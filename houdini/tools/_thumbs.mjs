// node tools/_thumbs.mjs <episode.html> <thumbs.js> <outDir> — renders window.makeThumb(i) for every thumbnail to outDir/thumb-N.png
import { chromium } from 'playwright';
import { writeFileSync, readFileSync } from 'node:fs';
const [page, script, outDir] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/zczc/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 30000 });
await p.addScriptTag({ content: readFileSync(script, 'utf8') });
const n = await p.evaluate(() => window.THUMB_N);
for (let i = 0; i < n; i++) { const url = await p.evaluate(i => window.makeThumb(i), i); writeFileSync(`${outDir}/thumb-${i + 1}.png`, Buffer.from(url.split(',')[1], 'base64')); }
console.log(n, 'thumbs', errs.join('\n')); await b.close();
