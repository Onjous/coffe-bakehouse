#!/usr/bin/env node
/**
 * Downloads the licensed source photographs listed in photos.manifest.json,
 * applies one shared grade so they sit together (slightly warm, softer blacks,
 * a little less saturation, fine grain) and writes them to src/assets/photos.
 *
 *   node scripts/prepare-photos.mjs            # all photos
 *   node scripts/prepare-photos.mjs hero room  # only these slugs
 *
 * Only needed when swapping photographs; the processed files are committed.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const manifest = JSON.parse(await readFile(path.join(root, "scripts/photos.manifest.json"), "utf8"));
const outDir = path.join(root, "src/assets/photos");
const cacheDir = path.join(root, ".photo-cache");
await mkdir(outDir, { recursive: true });
await mkdir(cacheDir, { recursive: true });

const only = process.argv.slice(2);
const UA = "NinepencePortfolio/1.0 (photo preparation script)";

async function download(url, file) {
  if (existsSync(file)) return readFile(file);
  let res;
  for (let attempt = 0; attempt < 6; attempt++) {
    res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status !== 429) break;
    await new Promise((r) => setTimeout(r, 5000 * (attempt + 1))); // Wikimedia rate limit: back off
  }
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(file, buf);
  return buf;
}

for (const photo of manifest) {
  if (only.length && !only.includes(photo.slug)) continue;
  const src = await download(photo.download, path.join(cacheDir, `${photo.slug}${path.extname(new URL(photo.download).pathname) || ".jpg"}`));

  let img = sharp(src).rotate();
  if (photo.extract) img = img.extract(photo.extract); // { left, top, width, height } in source pixels
  img = img.resize({ width: photo.maxWidth ?? 2000, height: photo.maxWidth ?? 2000, fit: "inside", withoutEnlargement: true });
  const g = photo.grade ?? {};

  const graded = await img
    .modulate({ saturation: g.saturation ?? 0.86, brightness: g.brightness ?? 1 })
    // warm the mids a touch, cool nothing
    .recomb([
      [1.03, 0.02, 0],
      [0.01, 1.0, 0.0],
      [0, 0.02, 0.93],
    ])
    // matte: lift the blacks slightly, keep whites
    .linear(g.contrast ?? 0.93, g.lift ?? 12)
    .toColourspace("srgb")
    .toBuffer({ resolveWithObject: true });

  const { width, height } = graded.info;
  const grain = await sharp({
    create: { width, height, channels: 3, background: "#808080", noise: { type: "gaussian", mean: 128, sigma: g.grain ?? 5 } },
  })
    .png()
    .toBuffer();

  await sharp(graded.data)
    .composite([{ input: grain, blend: "soft-light" }])
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(path.join(outDir, `${photo.slug}.jpg`));

  console.log(`✓ ${photo.slug} ${width}×${height}`);
}
