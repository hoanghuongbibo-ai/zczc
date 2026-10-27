// node tools/cues.mjs <page.html> <out.json> — dumps the page's sound cues (window.Show.cues) plus automatic transition
// sounds (whip pans → 'whip', ink wipes → 'whoosh', flashes → 'swish') for tools/mix.py.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [page, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
const cues = await p.evaluate(() => { const c = (Show.cues || []).slice(), AUTO = { whip: ['whip', .5], whipL: ['whip', .5], ink: ['whoosh', .45], flash: ['swish', .3], zoom: ['swish', .35] };
  for (const s of (window.SALT2 ? SALT2.LIST : [])) { const tr = typeof s.tr === 'string' ? s.tr : s.tr && s.tr.type; if (AUTO[tr]) c.push({ t: Math.max(0, s.t - .12), type: AUTO[tr][0], gain: AUTO[tr][1] }); }
  for (const k of (G => (G.EP.COUNTS || []))(window)) c.push({ t: k.t, type: 'cash', gain: .8 });
  return c.sort((a, b) => a.t - b.t); });
writeFileSync(out, JSON.stringify(cues)); console.log(cues.length, 'cues'); await b.close();
