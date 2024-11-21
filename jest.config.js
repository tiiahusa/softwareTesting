module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/', '/.internal/'],
    collectCoverageFrom: ['src/**/*.js'],
      transform: {
      '^.+\\.js$': 'babel-jest',
    },
  };