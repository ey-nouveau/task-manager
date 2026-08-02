const fs = require('fs');
const path = require('path');

const darkDir = path.join(__dirname, 'public/wallpapers/dark');
const lightDir = path.join(__dirname, 'public/wallpapers/light');

fs.mkdirSync(darkDir, { recursive: true });
fs.mkdirSync(lightDir, { recursive: true });

for(let i=1; i<=10; i++) {
  fs.copyFileSync(path.join(__dirname, 'public/vibey-bg.png'), path.join(darkDir, `${i}.webp`));
  fs.copyFileSync(path.join(__dirname, 'public/vibey-bg.png'), path.join(lightDir, `${i}.webp`));
}
console.log('Mock wallpapers generated');
