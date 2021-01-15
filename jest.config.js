module.exports = {
  transform: {
    '^.+\\.(ts|js)?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(.*)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '@Math/(.*)': ['<rootDir>/src/Math/$1'],
    '@Renderer/(.*)': ['<rootDir>/src/Renderer/$1'],
    '@SceneTree/(.*)': ['<rootDir>/src/SceneTree/$1'],
    '@Utilities/(.*)': ['<rootDir>/src/Utilities/$1'],
    '@helpers/(.*)': ['<rootDir>/src/helpers/$1'],
    '@Registry': ['<rootDir>/src/Registry'],
  },
}
