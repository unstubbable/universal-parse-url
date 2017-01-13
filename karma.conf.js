const karmaCommon = require('./karma.conf-common');

module.exports = function (config) {
  karmaCommon(config);
  config.set({
    browsers: ['Chrome', 'PhantomJS']
  });
};
