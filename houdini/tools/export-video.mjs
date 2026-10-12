// Renders an animation page frame-by-frame with headless Chromium and muxes it
// with the narration + synthesised soundtrack into an MP4.
// usage: node tools/export-video.mjs preview.html out/preview.mp4 [fps]
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [page_ = 'preview.html', out = 'out/preview.mp4', fpsArg = '30'] = process.argv.slice(2);
const fps = +fpsArg;
const tmp = fs.mkdtempSync(path.join(process.env.TMPDIR || '/tmp', 'collage-'));
fs.mkdirSync(path.dirname(path.resolve(root, out)), { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto(pathToFileURL(path.join(root, page_)).href + '?t=0');
await page.waitForFunction(() => window.READY === true);
const { duration, narration } = await page.evaluate(() => {
  const show = window.Show;
  return { duration: show.duration, narration: show.narration };
});

const frames = Math.round(duration * fps);
// WORKERS=n renders frames in n parallel browser contexts (one renderer process each); frames are saved as high-quality JPEG then
const WORKERS = +(process.env.WORKERS || 1), EXT = WORKERS > 1 ? 'jpg' : 'png';
async function work(pg, w) {
  for (let f = w; f < frames; f += WORKERS) {
    const b64 = await pg.evaluate(([t, jpg]) => { window.renderAt(t); return document.getElementById('stage').toDataURL(jpg ? 'image/jpeg' : 'image/png', .95).split(',')[1]; }, [f / fps, EXT === 'jpg']);
    fs.writeFileSync(path.join(tmp, `f${String(f).padStart(5, '0')}.${EXT}`), Buffer.from(b64, 'base64'));
    if (f % 120 === w) process.stdout.write(`frame ${f}/${frames}\n`);
  }
}
const pages = [page];
for (let w = 1; w < WORKERS; w++) { const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 720 } }); const pg = await ctx2.newPage();
  await pg.goto(pathToFileURL(path.join(root, page_)).href + '?t=0'); await pg.waitForFunction(() => window.READY === true); pages.push(pg); }
await Promise.all(pages.map((pg, w) => work(pg, w)));
const pcm = Buffer.from(await page.evaluate(() => window.renderSoundtrack()), 'base64');
fs.writeFileSync(path.join(tmp, 'music.raw'), pcm);
await browser.close();

execFileSync('ffmpeg', ['-y', '-loglevel', 'error',
  '-framerate', String(fps), '-i', path.join(tmp, `f%05d.${EXT}`),
  '-f', 's16le', '-ar', '44100', '-ac', '1', '-i', path.join(tmp, 'music.raw'),
  '-i', path.join(root, narration),
  '-filter_complex', '[1:a][2:a]amix=inputs=2:duration=first:normalize=0,volume=-1.5dB,alimiter=limit=0.89[a]',
  '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-c:a', 'aac', '-b:a', '160k',
  '-t', String(duration), path.resolve(root, out)], { stdio: 'inherit' });
fs.rmSync(tmp, { recursive: true, force: true });
console.log('wrote', out);
