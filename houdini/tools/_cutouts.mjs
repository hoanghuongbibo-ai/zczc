// node tools/_cutouts.mjs <page> <outdir> : saves window.OUT [[name,dataURL]...] as PNGs
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
const [page, dir] = process.argv.slice(2); mkdirSync(dir, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.DONE === true, null, { timeout: 60000 });
for (const [n, u] of await p.evaluate(() => window.OUT)) writeFileSync(`${dir}/${n}.png`, Buffer.from(u.split(',')[1], 'base64'));
console.log('ok', errs.join('\n')); await b.close();
