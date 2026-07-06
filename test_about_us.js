const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('file:///home/joshua/Desktop/Law%20Firm%20Site/KIAN%20ADVOCAATES/Kian%20Associated%20Advocates%20Officical%20site/About%20Us.html');
  // Wait a bit for Tailwind CDN to process
  await new Promise(r => setTimeout(r, 3000));
  const bgColor = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    return window.getComputedStyle(footer).backgroundColor;
  });
  console.log("FOOTER BACKGROUND COLOR:", bgColor);
  await browser.close();
})();
