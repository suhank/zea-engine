import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import webWorkerLoader from 'rollup-plugin-web-worker-loader'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import pkg from './package.json'

const plugins = [
  resolve({
    browser: true,
    preferBuiltins: false,
    extensions: ['.js', '.ts', '.json'],
  }),
  typescript({
    include: 'src/**/*.{js,ts}',
  }),
  commonjs(),
  nodePolyfills(),
  webWorkerLoader(),
  image(),
  json(),
  copy({
    targets: [{ src: 'public-resources', dest: 'dist' }],
  }),
]

const isProduction = !process.env.ROLLUP_WATCH
if (isProduction) {
  plugins.push(terser())
}

const inputFile = 'src/index.ts'
const sourcemap = !isProduction

export default [
  {
    input: inputFile,
    output: [
      { name: 'zeaEngine', file: pkg.browser, format: 'umd', sourcemap },
      { file: pkg.main, format: 'cjs', sourcemap },
      { file: pkg.module, format: 'es', sourcemap },
    ],
    plugins,
  },
]
