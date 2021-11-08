const glslify = require('rollup-plugin-glslify')
const { base64 } = require('rollup-plugin-base64')
const webWorkerLoader = require('rollup-plugin-web-worker-loader')
// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
const replace = require('@rollup/plugin-replace')

module.exports = {
  rollup(config, opts) {
    config.plugins = config.plugins.map(p =>
      p.name === 'replace'
        ? replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
            preventAssignment: true
          })
        : p
    )
    config.plugins = [
      glslify({ compress: false }),
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
