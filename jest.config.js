const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  testMatch: [
    '<rootDir>/src/**/__tests__/*.+(ts|tsx|js)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/.*',
    '<rootDir>/lib/.*',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, 
    {
     prefix: '<rootDir>' 
    } 
  )
};