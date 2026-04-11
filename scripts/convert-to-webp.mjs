import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sequenceDir = path.join(process.cwd(), 'public', 'sequence');

async function convertToWebp() {
  // Clean old webp files first
  const existingWebp = fs.readdirSync(sequenceDir).filter(f => f.endsWith('.webp'));
  for (const f of existingWebp) {
    fs.unlinkSync(path.join(sequenceDir, f));
  }
  console.log(`Cleaned ${existingWebp.length} old .webp files.\n`);

  const files = fs.readdirSync(sequenceDir)
    .filter(f => f.endsWith('.jpg'))
    .sort();

  console.log(`Found ${files.length} JPG files to convert...`);
  console.log(`Strategy: Resize 1920x1080 → 1280x720 + WebP quality 65\n`);

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const file of files) {
    const inputPath = path.join(sequenceDir, file);
    const outputPath = path.join(sequenceDir, file.replace('.jpg', '.webp'));

    const originalSize = fs.statSync(inputPath).size;
    totalOriginal += originalSize;

    await sharp(inputPath)
      .resize(1280, 720, { fit: 'cover' })
      .webp({ quality: 65 })
      .toFile(outputPath);

    const webpSize = fs.statSync(outputPath).size;
    totalWebp += webpSize;

    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    console.log(`✓ ${file} → .webp (${savings}% smaller)`);
  }

  console.log(`\n=== Summary ===`);
  console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP total:     ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Savings:        ${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}%`);
}

convertToWebp().catch(console.error);
