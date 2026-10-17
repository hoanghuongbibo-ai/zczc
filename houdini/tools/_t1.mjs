import { chromium } from 'playwright';
const [page, ...ts] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
let t0 = Date.now(); await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 300000 }); console.log('ready', Date.now() - t0);
for (const t of ts) { const r = await p.evaluate(t => { const a = performance.now(); renderAt(+t); const b1 = performance.now(); renderAt(+t + .04); const c = performance.now(); document.getElementById('stage').getContext('2d').getImageData(0, 0, 1, 1); return [Math.round(b1 - a), Math.round(c - b1)]; }, t); console.log(t, r.join(' / ')); }
await b.close();
