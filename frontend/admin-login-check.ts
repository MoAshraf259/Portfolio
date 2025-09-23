import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle' });
  const title = await page.textContent('h1');
  console.log('H1:', title);
  await browser.close();
})();
