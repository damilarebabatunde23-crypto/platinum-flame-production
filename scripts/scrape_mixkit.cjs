const https = require('https');

https.get('https://mixkit.co/free-stock-video/action/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /https:\/\/assets\.mixkit\.co\/videos\/[^"]+\.mp4/g;
    const matches = data.match(regex);
    console.log('Found MP4s:', matches ? Array.from(new Set(matches)).slice(0, 10) : 'none');
  });
});
