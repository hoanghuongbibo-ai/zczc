// node tools/_hirescmp.mjs <page> <outDir> <k> <t…> — render frames at k=1 and at k, for checking js/hires.js
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [page, out, k, ...ts] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
for (const kk of ['1', k]) { const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file:///home/user/zczc/houdini/' + page + '?k=' + kk); await p.waitForFunction(() => window.READY === true, null, { timeout: 90000 });
  for (const t of ts) { const u = await p.evaluate(t => { renderAt(+t); const c = document.getElementById('stage'); return [c.toDataURL('image/png'), c.width + 'x' + c.height]; }, t);
    writeFileSync(`${out}/k${kk}_${t}.png`, Buffer.from(u[0].split(',')[1], 'base64')); if (t === ts[0]) console.log('k', kk, 'logical', u[1]); }
  console.log(errs.slice(0, 5).join('\n')); await p.close(); }
await b.close();
