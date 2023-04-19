describe('blazedemo', () => {

  beforeAll(async () => {
    await createPage();
  });

  test('01_mainPage', async () => {
    await page.goto('https://blazedemo.com/');
  });

  test('02_vacation', async () => {
    await page.goto('https://blazedemo.com/vacation.html');
  });

});