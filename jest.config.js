/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  transform: {},
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: {
        moduleResolution: 'node',
        esModuleInterop: true
      }
    }
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1, 2}/.*)\\.js$': '$1'
  }
}
