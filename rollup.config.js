import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import svg from 'rollup-plugin-svg'
import { terser } from 'rollup-plugin-terser'
import webWorkerLoader from 'rollup-plugin-web-worker-loader'
import { base64 } from 'rollup-plugin-base64'
import glslify from 'rollup-plugin-glslify'

// import typescript from '@rollup/plugin-typescript' // TODO: remove if typescript2 is better
// import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const glslOptions = {
  // Default
  include: ['**/*.vs', '**/*.fs', '**/*.vert', '**/*.frag', '**/*.glsl'],

  // Undefined by default
  exclude: 'node_modules/**',

  // Compress shader by default using logic from rollup-plugin-glsl -- need to update parser to use this option -- it removes newlines
  compress: false
}

const plugins = [
  base64({ include: '**/*.wasm' }),
  commonjs(),
  nodePolyfills(),
  resolve({
    browser: true,
    preferBuiltins: false
  }),
  json(),
  webWorkerLoader(),
  svg(),
  glslify(glslOptions)
]

const isProduction = !process.env.ROLLUP_WATCH

if (isProduction) {
  plugins.push(terser())
}

const sourcemap = true

const result = [
  // Browser-friendly UMD build.
  {
    input: 'dist/index.js',
    output: {
      name: 'zeaEngine',
      file: pkg.browser,
      format: 'umd',
      sourcemap
    },
    plugins
  }
]

if (isProduction) {
  result.push(
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
      input: 'dist/index.js',
      output: [
        {
          file: pkg.main,
          format: 'cjs',
          sourcemap
        } /*,
        // I don't think this build is currently usable, so disabling it for now.
        { file: pkg.module, format: 'es', sourcemap }*/
      ],
      plugins
    }
  )
}

export default result
