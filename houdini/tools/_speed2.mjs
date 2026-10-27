import { chromium } from 'playwright';
const [page, ...ts] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
for (const t of ts) { const ms = await p.evaluate(t => { renderAt(+t); const a = performance.now(); for (let i = 0; i < 6; i++) renderAt(+t + i / 30); return (performance.now() - a) / 6; }, t); console.log(t, ms.toFixed(0), 'ms/frame'); }
await b.close();
