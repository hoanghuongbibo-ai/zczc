// render the whole timeline at a coarse step and report any exceptions (with times)
import { chromium } from 'playwright';
const [page, step = '0.2'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto('file:///home/user/zczc/houdini/' + page + '?t=0'); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
const errs = await p.evaluate(st => { const out = []; for (let t = 0; t < window.Show.duration; t += st) { try { window.renderAt(t); } catch (e) { out.push(t.toFixed(2) + ' ' + e.message); if (out.length > 30) break; } } return out; }, +step);
console.log(errs.length ? errs.join('\n') : 'no errors'); await b.close();
