import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [page, outDir, ...ts] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/zczc/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 30000 });
for (const t of ts) { const url = await p.evaluate(t => { renderAt(t); return document.getElementById('stage').toDataURL('image/png'); }, +t); writeFileSync(`${outDir}/t${String(t).padStart(7, '0')}.png`, Buffer.from(url.split(',')[1], 'base64')); }
console.log(errs.join('\n')); await b.close();
