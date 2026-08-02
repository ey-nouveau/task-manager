const fs = require('fs');
const path = require('path');

const darkDir = path.join(__dirname, 'public/wallpapers/dark');
const lightDir = path.join(__dirname, 'public/wallpapers/light');

// We have 1-5.webp. Let's duplicate them to get 1-10.webp
function duplicateMocks(dir) {
  for(let i = 1; i <= 5; i++) {
    const source = path.join(dir, `${i}.webp`);
    if(fs.existsSync(source)) {
      fs.copyFileSync(source, path.join(dir, `${i+5}.webp`));
    }
  }
}

duplicateMocks(darkDir);
duplicateMocks(lightDir);
console.log('Duplicated mock wallpapers to get 10 per folder.');
