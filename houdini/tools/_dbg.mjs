import { chromium } from 'playwright';
const [page, expr] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => errs.push(m.type() + ': ' + m.text()));
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 30000 });
try { console.log(await p.evaluate(expr)); } catch (e) { console.log('ERR', e.message); } console.log(errs.slice(0, 8).join('\n')); await b.close();
