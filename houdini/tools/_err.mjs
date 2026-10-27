// node tools/_err.mjs <page> — print page errors while loading and whether READY was reached
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); p.on('pageerror', e => console.log('ERR', e.message, (e.stack || '').split('\n')[1])); p.on('console', m => { if (m.type() === 'error') console.log('CON', m.text()); });
await p.goto('file:///home/user/zczc/houdini/' + process.argv[2]); await p.waitForTimeout(8000); console.log('READY', await p.evaluate(() => window.READY)); await b.close();
