describe('blazedemo', () => {

  beforeAll(async () => {
    await createPage();
  });

  test(`01_mainPage`, async () => {

      // opens provided url, networkidle0 waits for all requests to be completed
      await page.goto('https://blazedemo.com/');

      // expects a text or a string RegExp to be present in the page or element
      await expect(page).toMatchTextContent('Welcome to the Simple Travel Agency!',{timeout: 1000});   
      // expects an element with text to be present in the page or element
      await expect(page).toMatchElement('div > h1', { text: 'Welcome to the Simple Travel Agency!', timeout: 1000});
      // expects an element to be in the page or element, then clicks on it
      await expect(page).toClick('input.btn-primary', { clickCount: 2 , delay: 200});
    });

});