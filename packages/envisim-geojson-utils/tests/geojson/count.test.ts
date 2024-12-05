import {expect, test} from 'vitest';

import {MultiPoint} from '../../src/index.js';

const geometry = MultiPoint.create([
  [0, 0],
  [0, 1],
]);

test('count', () => {
  expect(geometry.count()).toBe(2);
});
