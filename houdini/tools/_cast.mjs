import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [page, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 2400, height: 2200 } }); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.DONE === true, null, { timeout: 30000 }).catch(() => {});
const url = await p.evaluate(() => document.getElementById('c').toDataURL('image/png')); writeFileSync(out, Buffer.from(url.split(',')[1], 'base64')); console.log(errs.join('\n') || 'ok'); await b.close();
