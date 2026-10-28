const https = require('https');

https.get('https://download.blender.org/demo/movies/ToS/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /href="([^"]+)"/g;
    let match;
    const files = [];
    while ((match = regex.exec(data)) !== null) {
      if (match[1].endsWith('.mp4') || match[1].endsWith('.webm') || match[1].endsWith('.mov') || match[1].endsWith('.mkv')) {
        files.push(match[1]);
      }
    }
    console.log('Video files found:', files);
  });
});
