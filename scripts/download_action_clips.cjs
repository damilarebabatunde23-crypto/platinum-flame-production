const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Saved ${dest}: ${fs.statSync(dest).size} bytes`);
          resolve();
        });
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  await download('https://assets.mixkit.co/videos/49229/49229-720.mp4', 'public/videos/action-combat.mp4');
  await download('https://assets.mixkit.co/videos/5961/5961-720.mp4', 'public/videos/action-stunt.mp4');
  await download('https://assets.mixkit.co/videos/24309/24309-720.mp4', 'public/videos/action-pursuit.mp4');
}

main().catch(console.error);
