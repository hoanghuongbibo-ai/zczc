import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
const dir = process.argv[2]; mkdirSync(dir, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + process.argv[3]); await p.waitForFunction(() => window.DONE === true, null, { timeout: 30000 });
const out = await p.evaluate(() => window.OUT);
for (const k in out) writeFileSync(`${dir}/${k}.png`, Buffer.from(out[k].split(',')[1], 'base64'));
console.log(Object.keys(out).length, 'elements', errs.join('\n')); await b.close();
