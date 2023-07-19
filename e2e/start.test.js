import puppeteer from "puppeteer";
import { fork } from 'child_process';

describe("page start", () => {
  let browser;
  let page;
  const baseUrl = "http://localhost:8080";

  //запуск браузера
  beforeEach(async () => {
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
      headless: false, //чтобы показывать реальный браузер
      slowMo: 100,
      devtools: true, //чтобы видеть инструменты разработчика
    });

    page = await browser.newPage();
  });

  test("test", async () => {
    await page.goto(baseUrl);
    await page.waitForSelector("body"); //этот метод заставит браузер ждать появления селектора body
  });

  //закрыть браузер
  afterAll(async () => {
    await browser.close();
  });
});