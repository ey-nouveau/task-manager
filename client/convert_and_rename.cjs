const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const searchesDir = path.join(__dirname, '../../image-search');
const darkDir = path.join(__dirname, 'public/wallpapers/dark');
const lightDir = path.join(__dirname, 'public/wallpapers/light');

// Clean dirs
[darkDir, lightDir].forEach(dir => {
    if(fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => fs.unlinkSync(path.join(dir, file)));
    } else {
      fs.mkdirSync(dir, { recursive: true });
    }
});

async function processImages() {
    if (!fs.existsSync(searchesDir)) {
      console.log('No image-search dir');
      return;
    }
    const files = fs.readdirSync(searchesDir);
    let darkCounter = 1;
    let lightCounter = 1;
    
    for(const file of files) {
        const inputPath = path.join(searchesDir, file);
        let outDir = file.includes('dark') ? darkDir : lightDir;
        let counter = file.includes('dark') ? darkCounter++ : lightCounter++;
        
        await sharp(inputPath).webp({ quality: 95 }).toFile(path.join(outDir, `${counter}.webp`));
    }
    
    // Duplicate to get 10 images each
    function duplicateToTen(dir, count) {
        let current = count;
        while(current <= 10) {
            for(let i=1; i<count; i++) {
                if(current > 10) break;
                fs.copyFileSync(path.join(dir, `${i}.webp`), path.join(dir, `${current}.webp`));
                current++;
            }
        }
    }
    
    duplicateToTen(darkDir, darkCounter);
    duplicateToTen(lightDir, lightCounter);
    
    console.log('Conversion and duplication complete!');
}

processImages().catch(console.error);
