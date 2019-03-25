process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function test(config) {
  config.set({
    basePath: '',
    frameworks: ['source-map-support', 'mocha'],
    files: [
      { pattern: 'tests/bundle/exclude-dupe-elements.js', type: 'module' },
      { pattern: 'tests/bundle/*.js', type: 'module' },
    ],
    reporters: ['mocha'],
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    logLevel: 'ERROR',
    browserConsoleLogOptions: { level: 'error', format: '%b %T: %m', terminal: true },
  });
};
