import { chromium } from 'playwright';
const [page, out, w, h] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => console.log('LOG', m.text()));
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.DONE === true, null, { timeout: 15000 });
await p.locator('canvas').first().screenshot({ path: out });
await b.close();
