// node tools/_sheetpage.mjs <page> <out.png> <js-expression drawing on ctx (1280x720 logical)> — run arbitrary drawing after READY
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [page, out, expr] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 90000 });
const u = await p.evaluate(expr => { const cv = document.getElementById('stage'), ctx = cv.getContext('2d'); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1280, 720); (new Function('ctx', 'G', expr))(ctx, window); return cv.toDataURL('image/png'); }, expr);
writeFileSync(out, Buffer.from(u.split(',')[1], 'base64')); console.log(errs.slice(0, 5).join('\n')); await b.close();
