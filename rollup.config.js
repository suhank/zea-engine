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
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const glslOptions = {
  // Default
  include: ['**/*.vs', '**/*.fs', '**/*.vert', '**/*.frag', '**/*.glsl'],

  // Undefined by default
  exclude: 'node_modules/**',

  // Compress shader by default using logic from rollup-plugin-glsl -- need to update parser to use this option -- it removes newlines
  compress: false,
}

const plugins = [
  resolve({
    browser: true,
    preferBuiltins: false,
  }),
  commonjs(),
  webWorkerLoader({ extensions: ['.ts', '.js'], pattern: /.+\-worker\.(?:js|ts)$/ }),
  json(),
  svg(),
  glslify(glslOptions),
  base64({ include: '**/*.wasm' }),
  typescript({
    tsconfig: 'tsconfig.json',
    include: 'src/**/*.{js,ts}',
  }),
  nodePolyfills(),
]

const isProduction = !process.env.ROLLUP_WATCH

if (isProduction) {
  plugins.push(terser())
}

const sourcemap = true

export default [
  // Browser-friendly UMD build.
  {
    input: 'src/index.ts',
    output: {
      name: 'zeaEngine',
      file: pkg.browser,
      format: 'umd',
      sourcemap,
    },
    plugins,
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs', sourcemap },
      { file: pkg.module, format: 'es', sourcemap },
    ],
    plugins,
  },
]
