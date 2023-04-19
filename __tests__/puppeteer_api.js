describe('blazedemo', () => {

  beforeAll(async () => {
    await createPage();
  });

  test(`01_mainPage`, async () => {
    // opens provided url, networkidle0 waits for all requests to be completed
    await page.goto('https://blazedemo.com/', {waitUntil: 'networkidle0'});                                          
  });

  test(`02_hoverOnElement`, async () => {
    await page.waitForSelector('input.btn-primary',{visible: true});
    // hovers on element matching selector
    await page.hover('input.btn-primary');                                                        
  });

  test(`03_clickOnElement`, async () => {
    await page.waitForSelector('input.btn-primary',{visible: true});             
    // clicks on element matching selector
    await Promise.all([
      page.waitForNavigation(),        // The promise resolves after the page is fully loaded
      page.click('input.btn-primary'), // Clicking the link will indirectly cause a navigation
    ]);                                                        
  });

  test(`04_reloadThePage`, async () => {               
    // reloads the page
    await page.reload({waitUntil: 'networkidle0'});                                                  
  });

  test(`05_captureScreenshot`, async () => {       
    // captures screenshot
    await page.screenshot({path: 'screenshot.jpg'});                                           
  });

  test(`06_clickOnElement`, async () => {       
    await page.waitForSelector('input.btn-small',{visible: true});
    // clicks on element matching selector
    await page.click('input.btn-small');                                                 
  });

  test(`07_type`, async () => {  
    await page.waitForSelector('#inputName',{visible: true});          
    // types slower, like a user
    await page.type('#inputName', 'world', {delay: 100});                                         
  });

  test(`08_printMetrics`, async () => {  
    // returns list of metrics (JavaScript execution time, used heap size, etc.)
    const metrics = await page.metrics(); 
    console.log(metrics);                                          
  });

});