const { TestEnvironment: NodeEnvironment } = require('jest-environment-node');
const puppeteer = require('puppeteer');

const { url, token, org, bucket } = require('./config/infludb_conf.js');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();

    this.global.createPage = async() => {
        this.global.browser = await puppeteer.launch({
          headless: this.global.HEADLESS, 
          defaultViewport: {width: this.global.WIDTH, height: this.global.HEIGHT},
          args: this.global.BROWSER_ARGS
        });
        this.global.page = await this.global.browser.newPage();
    }

    // runs the Lighthouse audit and the Navigation Timing API 

    this.global.runTestDesktop = async (url) => { 
      // lighthouse is ES module, therefore in CommonJS dynamic import should be used
      const lighthouseModule = await import('lighthouse');
      const lighthouse = lighthouseModule.default;
      const { default: desktopConfig } = await import('lighthouse/core/config/lr-desktop-config.js');

      // updates Lighthouse config according to global parameters from jest.config.js
      desktopConfig.settings.onlyAudits = this.global.metricsToSave;
      desktopConfig.settings.screenEmulation.width = this.global.WIDTH;
      desktopConfig.settings.screenEmulation.height = this.global.HEIGHT;

      // runs Lighthouse audits
      try {
        const report = await lighthouse(
          url, 
          this.global.lighthouseOptions,
          desktopConfig,
          this.global.page
        ); 
        
        // processes Lighthouse report
        await this.processLighthouseReport(report, url);
        
        // get Navigation Timing API
        const metrics = await this.global.page.evaluate(() => {
          return JSON.stringify(performance.getEntriesByType('navigation'));
        });
        
        // processes the Navigation Timing API metrics
        await this.processNavigationTimingApi(metrics, url);

      } catch (error) {
        console.error('Error while running desktop test:', error);
      }
    }


  }

  async teardown() {
    if (this.global.browser) {
      await this.global.browser.close(); // Only close the browser if it's already started
    }
    await super.teardown();
  }

  async handleTestEvent(event) {
    // test_done event indicates that test block is completed 
    if (event.name == 'test_done'){
      // checks global INFLUXDB parameter is true
      if (this.global.INFLUXDB){
        // converts the value to int
        const intValue = Math.round(event.test.duration);
        if (Number.isInteger(intValue)) {
          // sends data to InfluxDB
          await this.sendToInfluxDB('puppeteer',
                                    'responseTime',
                                    intValue,
                                    event.test.name,
                                    this.global.build                                      
                                   )    
        }    
      }
    }
  }

  // processes the Lighthouse audit report and saves the selected metrics to the InfluxDB database
  async processLighthouseReport(report, url){
    for (var [, value] of Object.entries(report.lhr.audits)) {
      if (this.global.metricsToSave.includes(value.id)){
        const intValue = Math.round(value.numericValue);
        if (this.global.INFLUXDB){
          if (Number.isInteger(intValue)) {
            await this.sendToInfluxDB('lighthouse', 
                                      value.id, 
                                      intValue, 
                                      url, 
                                      this.global.build
                                      );
          }
        }
        if (this.global.DEBUG){
          console.log('Key: ' + String(value.id) + ' Value: ' + String(intValue));
        }
      }
    }
  }

  // processes the Navigation Timing API metrics and saves them to the InfluxDB database
  async processNavigationTimingApi(metrics, url){
    // calculates serverConnectionTime metric
    const serverConnectionTime  = Math.round(metrics[0].connectEnd - metrics[0].connectStart);
    // sends metric to InfluxDB
    if(this.global.INFLUXDB){
        if (Number.isInteger(serverConnectionTime)) {
            await this.sendToInfluxDB("timingapi", "server-connection-time", serverConnectionTime, url);
        }
    }
  }

  async sendToInfluxDB(measurement, key, value, name, build = undefined) { 
    try {
      // opens InfluxDB connection
      const writeApi = new InfluxDB({url, token}).getWriteApi(org, bucket, 'ns');
      // creates InfluxDB point
      let point = new Point(measurement)
          .intField(key, value)
          .tag('name', name);

      if (build){  // if build was provided, this tag will be added
        point = point.tag('build', build)
      }
      // sends point to InfluxDB
      await writeApi.writePoint(point);
      // closes InfluxDB connection
      await writeApi.close();
    }catch(error){
      console.error('Influxdb ERROR: ' + error);
    }  
  }
}

module.exports = PuppeteerEnvironment;