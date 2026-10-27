// node tools/music.mjs <page.html> <out.raw> — the page's music bed (s16le mono 44.1 kHz)
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const [page, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); await p.goto('file:///home/user/zczc/houdini/' + page); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
writeFileSync(out, Buffer.from(await p.evaluate(() => window.renderSoundtrack()), 'base64')); console.log('music ok'); await b.close();
