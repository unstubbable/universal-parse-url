module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'karma-typescript'],
    files: ['src/**/*.ts'],
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },
    reporters: ['mocha', 'karma-typescript'],
    mochaReporter: {
      showDiff: true
    },
    singleRun: true
  });
};
