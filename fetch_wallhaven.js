const fs = require('fs');
const https = require('https');

async function searchWallhaven(query) {
  const url = `https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(query)}&categories=111&purity=100&atleast=2560x1440&sorting=toplist&order=desc`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data.map(img => img.path);
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  console.log('Fetching image lists from Wallhaven...');
  const darkUrls = await searchWallhaven('minimalist dark');
  const lightUrls = await searchWallhaven('minimalist bright landscape');

  const darkDir = './client/public/wallpapers/dark';
  const lightDir = './client/public/wallpapers/light';
  
  // clear dirs
  if(fs.existsSync(darkDir)) fs.readdirSync(darkDir).forEach(f => fs.unlinkSync(`${darkDir}/${f}`));
  if(fs.existsSync(lightDir)) fs.readdirSync(lightDir).forEach(f => fs.unlinkSync(`${lightDir}/${f}`));

  fs.mkdirSync(darkDir, { recursive: true });
  fs.mkdirSync(lightDir, { recursive: true });

  console.log(`Found ${darkUrls.length} dark and ${lightUrls.length} light images`);

  console.log('Downloading dark wallpapers...');
  for (let i = 0; i < 10; i++) {
    if (darkUrls[i]) {
      console.log(`Downloading dark ${i+1}... (${darkUrls[i]})`);
      await download(darkUrls[i], `${darkDir}/${i+1}.jpg`);
    }
  }

  console.log('Downloading light wallpapers...');
  for (let i = 0; i < 10; i++) {
    if (lightUrls[i]) {
      console.log(`Downloading light ${i+1}... (${lightUrls[i]})`);
      await download(lightUrls[i], `${lightDir}/${i+1}.jpg`);
    }
  }
}

run().catch(console.error);
