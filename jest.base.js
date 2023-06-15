export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  moduleNameMapper: {
    '(.+)\\.[jt]s': '$1',
  },
  roots: ['<rootDir>/tests/'],
  extensionsToTreatAsEsm: ['.ts'],
};
