const https = require('https');

async function scrapeKeywords() {
  const keywords = ['running', 'night-city', 'sports-car', 'martial-arts', 'fire', 'explosion', 'police', 'street'];
  for (const kw of keywords) {
    const url = `https://mixkit.co/free-stock-video/${kw}/`;
    await new Promise(resolve => {
      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const regex = /https:\/\/assets\.mixkit\.co\/videos\/(\d+)\/\1-720\.mp4/g;
          const matches = [];
          let match;
          while ((match = regex.exec(data)) !== null) {
            matches.push(match[0]);
          }
          console.log(kw, matches.slice(0, 3));
          resolve();
        });
      }).on('error', resolve);
    });
  }
}

scrapeKeywords();
