// scans the film for visual events (text, photos, figures appearing; scene cuts) and writes js/autosfx.js for the sound pass
import { chromium } from '/home/user/zczc/houdini/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); await p.goto('file:///home/user/zczc/houdini/canada/film.html?t=0'); await p.waitForFunction(() => window.READY === true);
const ev = await p.evaluate(() => { const cut = []; window.Film.chapters.forEach(ch => cut.push(...ch.cut)); return window.Coverage.scan(cut, window.Show.duration, .1); });
fs.writeFileSync(new URL('../js/autosfx.js', import.meta.url), '// visual events for the sound pass (tools/autosfx.mjs): [time, kind]\nwindow.AUTOSFX = ' + JSON.stringify(ev) + ';\n');
console.log(ev.length, 'events', ev.reduce((m, e) => (m[e[1]] = (m[e[1]] || 0) + 1, m), {})); await b.close();
