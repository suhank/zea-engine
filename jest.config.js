module.exports = {
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'json', 'text', 'lcov', 'clover'],

  transform: {
    '.(ts|tsx)$': require.resolve('ts-jest'),
    '.(js|jsx)$': require.resolve('babel-jest'), // jest's default
  },
  transformIgnorePatterns: ['node_modules/(.*)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|ts)$',
  moduleFileExtensions: ['ts', 'js'],
}
