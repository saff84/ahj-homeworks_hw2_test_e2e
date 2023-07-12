import puppetteer from "puppeteer";

jest.setTimeout(30000); // default puppeteer timeout

describe("card validator form", () => {
  let browser;
  let page;
  const baseUrl = "http://localhost:8080";

  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false, // чтобы показывать реальный браузер
      slowMo: 250,
      // devtools: true, // чтобы видеть инструменты разработчика
    });
    page = await browser.newPage(); //браузер открывает страницу
  });
  //закрывает браузер
  afterAll(async () => {
    await browser.close();
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

  afterAll(async () => {
    await browser.close();
  });
});