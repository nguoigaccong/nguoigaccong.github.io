const https = require('https');

https.get('https://hthaostudio.com/tong-hop-hinh-anh-profile-bac-si-nam-nu-dep-chuyen-nghiep/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const urls = [];
    while ((match = regex.exec(data)) !== null) {
      if (match[1].includes('.jpg') || match[1].includes('.png')) {
        urls.push(match[1]);
      }
    }
    console.log(urls.join('\n'));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
