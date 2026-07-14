#!/usr/bin/env node
/**
 * Turns raw artwork into web-ready assets.
 *
 *   npm run images
 *
 * Source  : app/images/   (JPEG, PNG or PDF — press artwork is usually PDF)
 * Output  : public/work/  (WebP, longest edge capped, quality-tuned)
 *
 * PDFs are rasterised with poppler (`pdftoppm`) before being handed to sharp.
 * Vector artwork is rendered at a high DPI first so that downscaling to the web
 * cap resamples cleanly, rather than upscaling a low-res raster.
 *
 * Filenames are slugified, so name the source file well and the pipeline needs no
 * edit at all. A source named `portrait.*` is treated as a site asset and written
 * to /public rather than /public/work.
 */

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'app/images';
const OUTPUT_DIR = 'public/work';
const PUBLIC_DIR = 'public';

/** Longest edge, in pixels. Beyond this, detail is invisible on any real screen. */
const MAX_EDGE = 2000;
/** WebP quality. 82 is the point where artefacts stop being visible on flat colour. */
const QUALITY = 82;
/** DPI used to rasterise PDFs. High enough that the downscale is a true resample. */
const PDF_DPI = 300;

/**
 * Source files are named deliberately (`srr-health-mix.pdf`, `loan-nanban-housing.jpeg`),
 * so the output name is just the slugified stem — no lookup table to keep in sync.
 * Name the file well when you drop it in and the pipeline needs no edit at all.
 */
const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Rasterises page 1 of a PDF to a JPEG in `dir`, returning the file path. */
function rasterisePdf(file, dir) {
  const stem = path.join(dir, 'page');
  execFileSync('pdftoppm', ['-jpeg', '-r', String(PDF_DPI), '-singlefile', file, stem], {
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  return `${stem}.jpg`;
}

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.error(`No source directory at ${SOURCE_DIR}`);
    process.exit(1);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });
  mkdirSync(PUBLIC_DIR, { recursive: true });
  const scratch = mkdtempSync(path.join(tmpdir(), 'artwork-'));

  const sources = readdirSync(SOURCE_DIR).filter((file) =>
    /\.(pdf|jpe?g|png|tiff?|webp)$/i.test(file)
  );

  if (sources.length === 0) {
    console.log(`Nothing to do — ${SOURCE_DIR} holds no images.`);
    return;
  }

  /** Guards against two sources slugifying to the same output name. */
  const written = new Map();

  try {
    for (const file of sources) {
      const absolute = path.join(SOURCE_DIR, file);
      const extension = path.extname(file).toLowerCase();
      const name = slugify(path.basename(file, extension));

      // Two differently-named sources can slugify to the same stem
      // ("My Card.pdf" and "my-card.jpg" both give "my-card"). Without this the
      // second write silently clobbers the first and a piece of work vanishes
      // from the site with no error anywhere.
      if (written.has(name)) {
        throw new Error(
          `Name collision: "${file}" and "${written.get(name)}" both produce ${name}.webp. Rename one.`
        );
      }
      written.set(name, file);

      // PDFs must be rasterised before sharp can read them.
      const raster = extension === '.pdf' ? rasterisePdf(absolute, scratch) : absolute;

      // The portrait is a site asset, not a piece of work, so it does not belong
      // in /work alongside the projects.
      const isPortrait = name.startsWith('portrait');
      const outputDir = isPortrait ? PUBLIC_DIR : OUTPUT_DIR;
      const output = path.join(outputDir, `${name}.webp`);

      /*
       * `.rotate()` with no argument applies the EXIF orientation tag.
       *
       * sharp does NOT do this automatically, and because we never call
       * withMetadata(), the tag is then stripped on the way to WebP. A photo shot
       * on a phone (Orientation=6) would come out rotated 90° — silently, and the
       * width/height printed below would be transposed too, so the numbers pasted
       * into projects.ts would describe the wrong box and reintroduce exactly the
       * layout shift those dimensions exist to prevent.
       *
       * Metadata is read from the same rotated pipeline, so the reported source
       * dimensions match what is actually written.
       */
      const pipeline = sharp(raster).rotate();
      const { width, height } = await pipeline.metadata();

      const info = await pipeline
        .clone()
        // `withoutEnlargement` guards against upscaling artwork that is already small.
        .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(output);

      console.log(`${file}\n  → ${output}  ${width}×${height} → ${info.width}×${info.height}`);
    }
  } finally {
    // Runs even if a conversion throws, so the temp dir never leaks.
    rmSync(scratch, { recursive: true, force: true });
  }

  console.log(`\nDone. ${sources.length} file(s) processed.`);
}

main().catch((error) => {
  console.error('Image preparation failed:', error.message);
  process.exit(1);
});
