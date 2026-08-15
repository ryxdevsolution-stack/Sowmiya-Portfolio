/**
 * Prints scripts/resume.html to public/Sowmiya-Ravichandran-Resume.pdf.
 *
 * ─── WHY HEADLESS CHROME AND NOT A PDF LIBRARY ─────────────────────────────
 * The résumé already in public/ was printed by headless Chrome — its Producer
 * string is "Skia/PDF" and its Creator is "HeadlessChrome". Regenerating it the
 * same way is what keeps a rebuilt file identical in metrics to the one already
 * sent to employers; a PDF library would re-typeset it and shift every line.
 *
 * Chrome is invoked as an external binary rather than through Puppeteer or
 * Playwright on purpose: this runs once in a while, by hand, and is not worth a
 * ~300MB dependency in a portfolio site's package.json. If no Chrome is found
 * the script says so and tells you the manual route, which produces the same
 * file — open the HTML in Chrome and Print → Save as PDF at A4 with margins set
 * to None and "Background graphics" enabled.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, 'resume.html');
const output = resolve(here, '..', 'public', 'Sowmiya-Ravichandran-Resume.pdf');

/** Chrome ships under several names depending on distribution and channel. */
const CANDIDATES = [
  process.env.CHROME_PATH,
  'google-chrome',
  'google-chrome-stable',
  'chromium',
  'chromium-browser',
  '/usr/bin/google-chrome',
  '/snap/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

function findChrome() {
  for (const candidate of CANDIDATES) {
    try {
      // `--version` is the cheapest way to prove a binary both exists and runs.
      execFileSync(candidate, ['--version'], { stdio: 'ignore' });
      return candidate;
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

if (!existsSync(source)) {
  console.error(`Missing source: ${source}`);
  process.exit(1);
}

const chrome = findChrome();

if (!chrome) {
  console.error(
    [
      'No Chrome or Chromium binary found.',
      '',
      'Set CHROME_PATH, or print it by hand — the result is identical:',
      `  1. Open ${source} in Chrome`,
      '  2. Print → Destination "Save as PDF"',
      '  3. Paper A4 · Margins None · Background graphics ON',
      `  4. Save over ${output}`,
    ].join('\n')
  );
  process.exit(1);
}

/*
 * Chrome writes --print-to-pdf relative to its own working directory and will
 * happily clobber a half-written file if it fails partway. Rendering into a
 * throwaway directory and copying on success keeps the committed PDF intact
 * when a run goes wrong.
 */
const staging = mkdtempSync(join(tmpdir(), 'resume-'));
const staged = join(staging, 'resume.pdf');

try {
  execFileSync(
    chrome,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      // The page sets @page{size:A4;margin:0}, so Chrome must not add its own
      // header, footer or default margins on top of it.
      '--no-pdf-header-footer',
      `--print-to-pdf=${staged}`,
      `file://${source}`,
    ],
    { stdio: 'ignore' }
  );

  if (!existsSync(staged)) throw new Error('Chrome produced no output file');

  copyFileSync(staged, output);
  console.log(`Résumé written to ${output}`);
} catch (error) {
  console.error(`Failed to render the résumé: ${error.message}`);
  process.exit(1);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
