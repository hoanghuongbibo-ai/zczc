// render specific times of a page: node at.mjs page.html out.png t1 t2 ... (tiles them)
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [page, out, ...ts] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
let i = 0; for (const t of ts) { const url = await p.evaluate(t => { renderAt(t); return document.getElementById('stage').toDataURL('image/jpeg', .85); }, +t); writeFileSync(out.replace('.png', `_${String(i++).padStart(2, '0')}.jpg`), Buffer.from(url.split(',')[1], 'base64')); }
console.log('ok', errs.slice(0, 5).join('\n')); await b.close();
