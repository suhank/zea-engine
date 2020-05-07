module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      /* https://github.com/karma-runner/karma/issues/2955 */
      { pattern: 'dist/index.esm.js', type: 'module', included: true },
      { pattern: 'tests/**/*.js', type: 'module' }
    ],
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
