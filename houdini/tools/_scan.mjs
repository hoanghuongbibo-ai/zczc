import { chromium } from 'playwright';
const [page] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true);
const errs = await p.evaluate(() => { const out = []; for (let t = 0; t < Show.duration; t += 1 / 30) { try { renderAt(t); } catch (e) { out.push(t.toFixed(2) + ' ' + e.message); if (out.length > 5) break; } } return out; });
console.log(errs.length ? errs.join('\n') : 'all frames OK'); await b.close();
