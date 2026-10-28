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
  await download('https://assets.mixkit.co/videos/23013/23013-720.mp4', 'public/videos/action-gun.mp4');
  await download('https://assets.mixkit.co/videos/28380/28380-720.mp4', 'public/videos/action-gun2.mp4');
  await download('https://assets.mixkit.co/videos/47862/47862-720.mp4', 'public/videos/action-soldier.mp4');
  await download('https://assets.mixkit.co/videos/23811/23811-720.mp4', 'public/videos/action-tactical.mp4');
  await download('https://assets.mixkit.co/videos/48288/48288-720.mp4', 'public/videos/action-explosion.mp4');
  await download('https://assets.mixkit.co/videos/47491/47491-720.mp4', 'public/videos/action-police.mp4');
  console.log('All action video downloads finished successfully!');
}

main().catch(console.error);
