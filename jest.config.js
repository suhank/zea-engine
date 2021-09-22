module.exports = {
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'json', 'text', 'lcov', 'clover'],
  moduleNameMapper: {
    '\\.(glsl|vert|frag|vs|fs|geom|comp)$': '<rootDir>/__mocks__/fileMock.js',
    'web-worker:.*': '<rootDir>/__mocks__/fileMock.js',
  },
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
