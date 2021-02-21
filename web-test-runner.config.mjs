import {puppeteerLauncher} from '@web/test-runner-puppeteer';

export default {
  nodeResolve: true,
  files: 'src/**/*.test.js',
  testFramework: {
    config: {
      ui: 'bdd'
    }
  },
  coverage: true,
  coverageConfig: {
    include: ['src/**/*.js'],
    exclude: ['src/**/*.test.js']
  },
  browsers: [
    puppeteerLauncher()
  ]
};