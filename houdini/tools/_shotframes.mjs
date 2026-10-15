// one PNG frame from the middle of every shot: node tools/_shotframes.mjs <episode.html> <outDir>
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
const [page, dir] = process.argv.slice(2); mkdirSync(dir, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
const shots = await p.evaluate(() => Show.shots.map(s => [s.start, s.end]));
let i = 0; for (const [a, e] of shots) { const t = a + (e - a) * .6;
  const u = await p.evaluate(t => { renderAt(t); return document.getElementById('stage').toDataURL('image/png'); }, t);
  writeFileSync(`${dir}/shot${String(++i).padStart(2, '0')}_${t.toFixed(1)}s.png`, Buffer.from(u.split(',')[1], 'base64')); }
console.log('ok', shots.length, errs.slice(0, 3).join('\n')); await b.close();
