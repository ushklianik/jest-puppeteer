# JEST PUPPETEER

This is a test suite that uses Jest and Puppeteer to perform automated tests on web pages. The test suite is intended for evaluating page performance using the Lighthouse audit, and the Navigation Timing API.
The configuration file jest.config.js specifies the environment to run tests, the test match pattern, and global variables that affect how tests are run.

The environment is defined in the env.js file and extends jest-environment-node. This environment sets up the browser using Puppeteer, defines a method for running tests on desktop, and handles sending test results to InfluxDB

## How to install
1) You'll need to have node and npm installed on your machine.
2) Clone the repository
3) Install development dependencies by running the following command: npm install --save-dev puppeteer jest lighthouse expect-puppeteer @influxdata/influxdb-client


## Running tests
To run the test suite, simply run **`npx jest`** in the terminal. This will run the Jest test runner and execute all tests that match the pattern specified in jest.config.js.

## Configuration
The configuration for the test suite is specified in the jest.config.js file. The following properties are defined in this file:

- **testEnvironment:** Specifies the environment to run tests. In this case, the environment is specified in the env.js file.
- **testMatch:** Specifies the pattern to match test files. In this case, it matches any .js file located in __tests__ directories.
- **testTimeout:** Specifies the default timeout for a test. In this case, it is set to 90 seconds.
- **globals:** Defines global variables that affect how tests are run. The following variables are defined:
- **DEBUG:** If set to true, debug messages will be printed to the console.
- **HEADLESS:** If set to false, the browser will run in headful mode. If set to true, the browser will run in headless mode.
- **INFLUXDB:** If set to true, test results will be sent to InfluxDB.
- **WIDTH and HEIGHT:** The width and height of the browser window.
- **BROWSER_ARGS:** An array of additional arguments to pass to the browser when it is launched.
- **metricsToSave:** An array of Lighthouse audit metrics to save to InfluxDB.
- **lighthouseOptions:** Options to pass to Lighthouse when running audits.


## Environment
The environment is defined in the env.js file and extends jest-environment-node. This environment sets up the browser using Puppeteer, defines a method for running tests on desktop, and handles sending test results to InfluxDB.

### createPage()
This method creates a new page in the browser and sets it as global.page.

### runTestDesktop(url)
This method runs a Lighthouse audit and the Navigation Timing API on a specified URL. The audit metrics specified in the metricsToSave array are saved to InfluxDB.

## InfluxDB
The test results are sent to InfluxDB using the @influxdata/influxdb-client library. The InfluxDB configuration is specified in the influxdb_conf.js file. The handleTestEvent method in the env.js file is used to send the test results to InfluxDB.

## Debugging
To enable debugging messages, set the DEBUG variable to true in the jest.config.js file. Debugging messages will be printed to the console during the test run.

## Example test scripts
- **expect-puppeteer.js:** This test file uses the expect-puppeteer library, which extends Jest's expect function with methods that interact with the Puppeteer API. The tests use expect-puppeteer's methods to perform various assertions on the BlazeDemo website, such as checking for the presence of text and clicking on an element.
- **expect.js:** This test file does not use any additional libraries or frameworks and instead relies on Jest's built-in expect function. The tests check for the correctness of the page title, the presence of a specific element, and the presence of specific text on the page.
- **lighthouse.js:** This test file uses Google's Lighthouse library to test the performance of the BlazeDemo website. The test runs Lighthouse's desktop configuration on the website and generates a report on its performance.
- **puppeteer_api.js:** This test file uses Puppeteer's API directly to perform various actions on the BlazeDemo website, such as clicking on an element, reloading the page, and taking a screenshot.
- **simpletest.js:** This test file contains a simple test that only navigates to the BlazeDemo website.
- **waits.js:** This test file demonstrates various methods of waiting for elements to appear on the page before performing actions on them. The tests use Puppeteer's waitForSelector and waitForXPath methods, as well as the waitForTimeout method to pause execution for a set amount of time.
