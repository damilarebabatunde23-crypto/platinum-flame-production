const https = require('https');

async function searchPage(query) {
  return new Promise((resolve) => {
    const url = `https://mixkit.co/free-stock-video/${encodeURIComponent(query)}/`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /https:\/\/assets\.mixkit\.co\/videos\/(\d+)\/\1-720\.mp4/g;
        const matches = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          matches.push(match[0]);
        }
        resolve(Array.from(new Set(matches)));
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const fight = await searchPage('fight');
  const boxing = await searchPage('boxing');
  const chase = await searchPage('car-chase');
  const motorcycle = await searchPage('motorcycle-speed');
  const action = await searchPage('action');
  console.log('Fight:', fight.slice(0, 5));
  console.log('Boxing:', boxing.slice(0, 5));
  console.log('Chase:', chase.slice(0, 5));
  console.log('Motorcycle:', motorcycle.slice(0, 5));
  console.log('Action:', action.slice(0, 5));
}

run();
