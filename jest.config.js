module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/', '/.internal/'],
      transform: {
      '^.+\\.js$': 'babel-jest',
    },
  };