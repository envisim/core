export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  moduleNameMapper: {
    '(.+)\\.[jt]s': '$1',
  },
  roots: ['<rootDir>/tests/'],
};
