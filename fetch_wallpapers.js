const fs = require('fs');
const https = require('https');

async function searchUnsplash(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results.map(r => r.urls.raw + '&w=3840&q=90&fit=crop');
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // handle redirects
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
  console.log('Fetching image lists...');
  const darkUrls = await searchUnsplash('dark minimal aesthetic wallpaper');
  const lightUrls = await searchUnsplash('light pastel minimal nature desktop');

  const darkDir = './client/public/wallpapers/dark';
  const lightDir = './client/public/wallpapers/light';

  fs.mkdirSync(darkDir, { recursive: true });
  fs.mkdirSync(lightDir, { recursive: true });

  console.log('Downloading dark wallpapers...');
  for (let i = 0; i < 10; i++) {
    if (darkUrls[i]) {
      console.log(`Downloading dark ${i+1}...`);
      await download(darkUrls[i], `${darkDir}/${i+1}.jpg`);
    }
  }

  console.log('Downloading light wallpapers...');
  for (let i = 0; i < 10; i++) {
    if (lightUrls[i]) {
      console.log(`Downloading light ${i+1}...`);
      await download(lightUrls[i], `${lightDir}/${i+1}.jpg`);
    }
  }
}

run().catch(console.error);
