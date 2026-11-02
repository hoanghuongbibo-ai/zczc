import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto('file:///home/user/zczc/houdini/' + process.argv[2]); await p.waitForFunction(() => window.READY === true, null, { timeout: 90000 });
const r = await p.evaluate(([a, z, st]) => { const out = []; for (let t = a; t < z; t += st) { try { renderAt(t); } catch (e) { out.push(t.toFixed(2) + ' ' + e.message + ' ' + (e.stack || '').split('\n')[1]); } } return [out, Show.shots.length]; }, [Number(process.argv[3]), Number(process.argv[4]), Number(process.argv[5] || .25)]);
const seen = new Set(); for (const l of r[0]) { const k = l.split(' ').slice(1).join(' '); if (!seen.has(k)) { seen.add(k); console.log(l); } } console.log('errors', r[0].length, 'shots', r[1], errs.slice(0, 5)); await b.close();
