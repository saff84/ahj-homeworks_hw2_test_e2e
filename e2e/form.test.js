import puppeteer from "puppeteer";
import { fork } from 'child_process';

jest.setTimeout(30000);

describe("in form", () => {
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

    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  // закрыть браузер
  // afterAll(async () => {
  //   await browser.close();
  // });

  test("form should render on page", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".filter-widget-form"); //этот метод заставит браузер ждать появления селектора body
  });

  test("valid form", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".filter-widget-form"); //этот метод заставит браузер ждать появления селектора body

    const form = await page.$(".filter-widget-form");
    const input = await form.$(".form-control");
    const button = await form.$(".btn");
    await input.type("2202200112561350");
    await button.click();

    await page.waitForSelector(".filter-widget-form");
  });
  
 
});