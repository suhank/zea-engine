const glslify = require('rollup-plugin-glslify');

const glslOptions = {
  compress: false,
};

module.exports = {
  rollup(config, options) {
    config.plugins = [glslify(glslOptions), ...config.plugins];
    
    return config; // always return a config.
  },
};
