import puppeteer from "puppeteer";
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe("card validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8080';

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
    page = await browser.newPage(); //браузер открывает страницу
  });
  //закрывает браузер
  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("form should render on page start", async () => {
    await page.goto(baseUrl);
    await page.waitForSelector(".filter-widget-form"); //проверяет есть ли на странице форма
  });

  //тест на валидность номера карты
  test("checking valid code", async () => {
    await page.goto(baseUrl);
    const form = await page.$(".filter-widget-form");
    const input = await page.$("input");
    const button = await form.$("button");
    await input.type("2202200112561350");
    await button.click();
    const result = await page.evaluate(
      () => document.getElementById("result").textContent
    );
    await expect(result).toBe("Действующая карта");
  });

  //тест на невалидный номер карты
  test("checking invalid code", async () => {
    await page.goto(baseUrl);
    const form = await page.$(".filter-widget-form");
    const input = await page.$("input");
    const button = await form.$("button");
    await input.type("213467589");
    await button.click();
    const result = await page.evaluate(
      () => document.getElementById("result").textContent
    );
    await expect(result).toBe("Введён некорректный номер карты!");
  });

  
});