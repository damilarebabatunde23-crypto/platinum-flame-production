const https = require('https');

function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  https.get(url, { headers: { 'User-Agent': 'PlatinumFlame/1.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        const titles = (json.query?.search || []).map(s => s.title);
        console.log(`Results for ${query}:`, titles.slice(0, 10));
      } catch (e) {
        console.error(e);
      }
    });
  });
}

searchCommons('action movie filetype:video');
searchCommons('stunt combat filetype:video');
searchCommons('martial arts fight filetype:video');
