const karmaCommon = require('./karma.conf-common');

const customLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'Chrome',
    version: 'latest'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'Firefox',
    version: 'latest'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'Internet Explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
  sl_ie_10: {
    base: 'SauceLabs',
    browserName: 'Internet Explorer',
    platform: 'Windows 7',
    version: '10'
  },
  sl_ie_9: {
    base: 'SauceLabs',
    browserName: 'Internet Explorer',
    platform: 'Windows 7',
    version: '9'
  },
  sl_edge: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: 'latest'
  },
  sl_safari: {
    base: 'SauceLabs',
    browserName: 'Safari',
    platform: 'macOS 10.12',
    version: 'latest'
  }
}

module.exports = function (config) {
  karmaCommon(config);
  config.set({
    sauceLabs: {
      testName: 'universal-parse-url',
      startConnect: !process.env.TRAVIS,
      connectOptions: {
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
      }
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['mocha', 'saucelabs']
  });
};
