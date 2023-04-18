const {jsWithTsESM: tsjPreset} = require('ts-jest/presets');

module.exports = {
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.json',
  //   },
  // },
  transform: {...tsjPreset.transform},
  moduleNameMapper: {
    '(.+)\\.[jt]s': '$1',
  },
  testMatch: ['<rootDir>/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
};
