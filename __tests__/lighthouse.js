describe('blazedemo', () => {

  beforeAll(async () => {
    await createPage();
  });

  test(`01_mainPage`, async () => {
    await runTestDesktop('https://www.pmi.org/');
  });

});