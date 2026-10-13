import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto('file:///home/user/zczc/houdini/vindolanda/episode.html?t=0'); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
for (const t0 of [5, 120, 250, 380, 500, 560, 700]) { const s = Date.now(); for (let i = 0; i < 20; i++) await p.evaluate(t => { renderAt(t); return document.getElementById('stage').toDataURL('image/jpeg', .93).length; }, t0 + i / 30); console.log(t0, ((Date.now() - s) / 20).toFixed(0), 'ms/frame'); }
const s = Date.now(); await p.evaluate(() => window.renderSoundtrack().length); console.log('soundtrack', Date.now() - s, 'ms');
await b.close();
