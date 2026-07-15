const https = require('https');
https.get('https://unpkg.com/lucide@latest', (res) => {
  console.log("Status: " + res.statusCode);
  console.log("Headers: " + JSON.stringify(res.headers));
});
