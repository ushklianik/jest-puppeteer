// InfluxDB URL
const url = process.env['INFLUX_URL'] || 'http://127.0.0.1:8086';
// InfluxDB authorization token
const token = process.env['INFLUX_TOKEN'] || 'TOKEN';
// organization within InfluxDB
const org = process.env['INFLUX_ORG'] || 'ORG';
// InfluxDB bucket used in examples
const bucket = 'puppeteer';

module.exports = {
  url,
  token,
  org,
  bucket
};