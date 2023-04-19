module.exports = {
    testEnvironment: './env.js',           //custom environment class 
    testMatch: ['**/__tests__/**/*.js'],   //pattern to detect test files
    testTimeout: 90000,                    //default timeout of a test
    globals: {                             //global variables
        DEBUG: false,
        HEADLESS: true,
        INFLUXDB: true,
        WIDTH: 1920,
        HEIGHT: 1080,
        BROWSER_ARGS: ['--start-maximized'],
        metricsToSave: [
            "first-contentful-paint",
            "largest-contentful-paint",
            "first-meaningful-paint",
            "speed-index",
            "total-blocking-time",
            "cumulative-layout-shift",
            "server-response-time",
            "interactive"
        ],
        lighthouseOptions: {
            output: 'json',
            disableDeviceEmulation: true,
            chromeFlags: ['--start-maximized', '--clear-storage']
        }
    },
    setupFilesAfterEnv: ["expect-puppeteer"]
};