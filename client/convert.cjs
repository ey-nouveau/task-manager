const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const darkDir = path.join(__dirname, 'public/wallpapers/dark');
const lightDir = path.join(__dirname, 'public/wallpapers/light');

async function convertDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(/\.(png|jpg)$/, '.webp'));
      try {
        await sharp(inputPath)
          .webp({ quality: 90 })
          .toFile(outputPath);
        console.log(`Converted ${file} to webp`);
        fs.unlinkSync(inputPath); // Delete original
      } catch (e) {
        console.error(`Failed on ${file}`, e);
      }
    }
  }
}

async function run() {
  await convertDir(darkDir);
  await convertDir(lightDir);
}

run().catch(console.error);
