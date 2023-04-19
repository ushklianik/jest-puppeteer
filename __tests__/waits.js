describe('blazedemo', () => {

  beforeAll(async () => {
    await createPage();
  });

  test(`01_mainPage`, async () => {
    await page.goto('https://blazedemo.com/', {waitUntil: 'networkidle0'});
    await page.waitForSelector('input.btn-primary', {visible: true});
    await page.waitForXPath('//input[contains(@class, "btn-primary")]', {visible: true});
    await page.waitForTimeout(100);
  });

  test(`02_findFlights`, async () => {
    await Promise.all([
      page.waitForNavigation(),        // The promise resolves after the page is fully loaded
      page.click('input.btn-primary'), // Clicking the link will indirectly cause a navigation
    ]);
  });

});