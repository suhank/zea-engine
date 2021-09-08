const glslify = require('rollup-plugin-glslify')
const webWorkerLoader = require('rollup-plugin-web-worker-loader')

const glslOptions = {
  compress: false
}

module.exports = {
  rollup(config) {
    config.plugins = [
      ...config.plugins,
      glslify(glslOptions),
      webWorkerLoader({ extensions: ['.ts', '.js'], pattern: /.+\.worker\.(?:js|ts)$/ })
    ]

    return config // always return a config.
  }
}
