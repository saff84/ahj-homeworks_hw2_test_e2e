import puppeteer from "puppeteer";
import { fork } from 'child_process';

describe("page start", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8080';

  //запуск браузера
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);

    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      //опции при запуске браузера
      // headless: false, //чтобы показывать реальный браузер
      // slowMo: 100,
      // devtools: true, //чтобы видеть инструменты разработчика
    });

    page = await browser.newPage();
  });

  
  afterAll(async () => {
    await browser.close();
    server.kill();
  });


  test("test", async () => {
    await page.goto(baseUrl);
    await page.waitForSelector("body"); //этот метод заставит браузер ждать появления селектора body
  });

 
});