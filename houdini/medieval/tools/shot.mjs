import { chromium } from 'playwright';
const [page, out, w = 2400, h = 2500] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + page); await p.waitForFunction(() => window.DONE === true, null, { timeout: 20000 }).catch(() => {});
await p.screenshot({ path: out }); console.log(errs.join('\n') || 'ok'); await b.close();
