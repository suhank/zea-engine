const glslify = require('rollup-plugin-glslify')
const { base64 } = require('rollup-plugin-base64')
const webWorkerLoader = require('rollup-plugin-web-worker-loader')

const glslOptions = {
  compress: false
}

module.exports = {
  rollup(config) {
    config.plugins = [
      glslify(glslOptions),
      base64({ include: '**/*.wasm' }),
      webWorkerLoader({ 
        extensions: ['.ts', '.js'], 
        pattern: /.+\-worker\.(?:js|ts)$/ 
      }),
      ...config.plugins
    ]

    return config // always return a config.
  }
}
