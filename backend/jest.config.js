module.exports = {
    preset: 'ts-jest', 
    testEnvironment: 'node', 
  
    setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'], 
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
      },
      transform: {
        '^.+\\.ts?$': 'ts-jest'
      },
      testMatch: [
        '**/?(*.)+(spec|test).[tj]s?(x)'
      ],
      testPathIgnorePatterns: [
        '<rootDir>/dist'
      ]    
  };