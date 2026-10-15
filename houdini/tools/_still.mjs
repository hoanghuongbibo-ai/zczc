// lossless stills: node tools/_still.mjs <page> <outdir> [--clean] name=t name=t ...
// --clean mutes on-screen text (titles, tags, bubbles, captions) for poster/thumbnail plates
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
const args = process.argv.slice(2), page = args[0], dir = args[1], clean = args.includes('--clean');
const items = args.slice(2).filter(a => a.includes('=')).map(a => a.split('='));
mkdirSync(dir, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
if (clean) await p.evaluate(() => { const K = window.VK, F = window.FX, nop = () => {};
  for (const k of ['txt', 'quote', 'counter', 'tag', 'title', 'bubble', 'mythCard', 'wroteSting']) K[k] = nop;
  for (const k of ['bigText', 'dateTag', 'caption', 'label', 'subtitle']) if (F[k]) F[k] = nop; });
for (const [name, t] of items) { const url = await p.evaluate(t => { renderAt(t); return document.getElementById('stage').toDataURL('image/png'); }, +t);
  writeFileSync(`${dir}/${name}.png`, Buffer.from(url.split(',')[1], 'base64')); }
console.log('ok', items.length, errs.slice(0, 5).join('\n')); await b.close();
