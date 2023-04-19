describe('blazedemo', () => {

  beforeAll(async () => {
    await createPage();
  });

  test(`01_mainPage`, async () => {
    // opens provided url, networkidle0 waits for all requests to be completed
    await page.goto('https://blazedemo.com/');
    const pageTitle = await page.title();
    // checks that the page title is correct
    expect(pageTitle).toBe('BlazeDemo');
    // checks that a specific element is present on the page
    const button = await page.$('input.btn-primary');
    expect(button).not.toBeNull();
    // checks that a specific text is present on the page
    const welcomeMessage = await page.$eval('div > h1', el => el.textContent);
    expect(welcomeMessage).toContain('Welcome to the Simple Travel Agency!');
  });

});