module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      /* https://github.com/karma-runner/karma/issues/2955 */
      { pattern: 'dist/index.esm.js', type: 'module', included: true },
      {
        pattern: 'node_modules/resemblejs/resemble.js',
        type: 'js',
        included: true,
      },
      { pattern: 'setup-visual-test.js', type: 'module' },
      { pattern: 'tests/**/*.js', type: 'module' },
      { pattern: 'tests/**/*.png', included: false, nocache: true },
      { pattern: 'tests/**/*.json', included: false, nocache: true }
    ],
    proxies: {
      '/refs/': '/base/tests/refs/'
    },
    reporters: ['progress'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,

    browsers: ['Chrome', 'ChromeHeadless', 'MyHeadlessChrome'],
    customLaunchers: {
      MyHeadlessChrome: {
        base: 'ChromeHeadless',
        flags: [
          '--disable-translate',
          '--disable-extensions',
          '--no-first-run',
          '--disable-background-networking',
          '--remote-debugging-port=9223',
        ],
      },
    },

    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
  })
}
