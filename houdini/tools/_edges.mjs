// node tools/_edges.mjs <page> — list shots whose frame shows black (off-set) edges at the start or end of the shot
import { chromium } from 'playwright';
const [page] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
const res = await p.evaluate(() => { const out = [], cv = document.getElementById('stage'), g = cv.getContext('2d');
  const dark = (x, y, w, h) => { const d = g.getImageData(x, y, w, h).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] < 30) n++; return n / (d.length / 4); };
  Show.shots.forEach((s, i) => { for (const f of [.08, .5, .97]) { const t = s.start + (s.end - s.start) * f; renderAt(t);
    const e = { B: dark(0, 712, 1000, 6), T: dark(0, 0, 1280, 6), L: dark(0, 0, 6, 600), R: dark(1274, 0, 6, 600) }; const bad = Object.entries(e).filter(([k, v]) => v > .8).map(([k]) => k);
    if (bad.length) { out.push(`${i} t=${t.toFixed(1)} f=${f} ${bad.join('')}`); break; } } }); return out; });
console.log(res.join('\n')); console.log(res.length, 'flagged'); await b.close();
