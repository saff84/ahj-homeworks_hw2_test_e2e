import puppeteer from "puppeteer";

jest.setTimeout(30000);

describe("in form", () => {
  let browser;
  let page;

  //запуск браузера
  beforeEach(async () => {
    browser = await puppeteer.launch({
      //опции при запуске браузера
      headless: false, //чтобы показывать реальный браузер
      slowMo: 250,
      // devtools: true,//чтобы видеть инструменты разработчика
    });

    page = await browser.newPage();
  });

  // закрыть браузер
  afterAll(async () => {
    await browser.close();
  });

  test("form should render on page", async () => {
    await page.goto("http://localhost:8080");

    await page.waitForSelector(".filter-widget-form"); //этот метод заставит браузер ждать появления селектора body
  });

  test("valid form", async () => {
    await page.goto("http://localhost:8080");

    await page.waitForSelector(".filter-widget-form"); //этот метод заставит браузер ждать появления селектора body

    const form = await page.$(".filter-widget-form");
    const input = await form.$(".form-control");
    const button = await form.$(".btn");
    await input.type("2202200112561350");
    await button.click();

    await page.waitForSelector(".filter-widget-form");
  });
  
  afterAll(async () => {
    await browser.close();
  });
});