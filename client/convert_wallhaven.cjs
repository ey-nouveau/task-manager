const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const darkDir = path.join(__dirname, 'public/wallpapers/dark');
const lightDir = path.join(__dirname, 'public/wallpapers/light');

async function processDir(dir) {
    const files = fs.readdirSync(dir);
    for(const file of files) {
        if(file.endsWith('.jpg') || file.endsWith('.png')) {
            const inputPath = path.join(dir, file);
            const outputPath = path.join(dir, file.replace(/\.(png|jpg)$/, '.webp'));
            await sharp(inputPath).webp({ quality: 90 }).toFile(outputPath);
            fs.unlinkSync(inputPath);
            console.log(`Converted ${outputPath}`);
        }
    }
}

async function run() {
    await processDir(darkDir);
    await processDir(lightDir);
    console.log('Done converting wallhaven images to webp!');
}

run().catch(console.error);
