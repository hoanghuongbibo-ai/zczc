import { chromium } from 'playwright';
const [page, out, w, h] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto('file://' + page); await p.waitForFunction(() => window.DONE === true, null, { timeout: 20000 }).catch(e => errs.push('timeout'));
const url = await p.evaluate(() => document.getElementById('c').toDataURL('image/png'));
(await import('node:fs')).writeFileSync(out, Buffer.from(url.split(',')[1], 'base64'));
console.log('ok', errs.join('\n')); await b.close();
