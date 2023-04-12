// import {Property} from "csstype";
import {Page} from "puppeteer";

describe('FractalNoise component', async () => {
  let page: Page;
  // const browser = await puppeteer.launch({deviceScaleFactor: 1});
  // const page = await browser.newPage();

  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('renders particles on the canvas', async () => {
    const canvas = await page.$('canvas');
    const screenshot = await canvas!.screenshot();
    const imgData = new Uint8Array(screenshot as ArrayBufferLike);

    // Check if there are any non-black pixels
    let hasNonBlackPixels = false;
    for (let i = 0; i < imgData.length; i += 4) {
      if (imgData[i] !== 0 || imgData[i + 1] !== 0 || imgData[i + 2] !== 0) {
        hasNonBlackPixels = true;
        break;
      }
    }

    expect(hasNonBlackPixels).toBeTruthy();
  }, 20000);
});
