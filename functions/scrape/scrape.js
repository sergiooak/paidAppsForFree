const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const wait = require('waait');


async function getScreenshot() {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1.5 });
  await page.goto(url);
  await wait(1000);
  const buffer = await page.screenshot({ type: 'png' });
  const base64Image = buffer.toString('base64');
  cached.set(url, base64Image);
  return base64Image;
}

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  const qs = event.queryStringParameters;
  const isDev = (process.env.URL == "http://localhost:3000") ? (true) : (false)

  return {
    statusCode: 200,
    body: JSON.stringify(isDev)
  };
};
