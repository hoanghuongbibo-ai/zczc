// node tools/_durs.mjs <page> [minSec] — list shot durations above minSec (with the transcript line they start on)
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); await p.goto('file:///home/user/zczc/houdini/' + process.argv[2]); await p.waitForFunction(() => window.READY === true, null, { timeout: 90000 });
const r = await p.evaluate(() => Show.shots.map((s, i) => [i, +s.start.toFixed(1), +(s.end - s.start).toFixed(1)])); const m = Number(process.argv[3] || 7);
const L = r.filter(x => x[2] >= m); console.log(L.map(x => x.join(' ')).join('\n')); console.log('n', r.length, 'long', L.length, 'avg', (r.reduce((a, x) => a + x[2], 0) / r.length).toFixed(2)); await b.close();
