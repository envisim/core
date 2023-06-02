import {MultiPoint} from '../src/index.js';

describe('count', () => {
  const geometry = MultiPoint.create([
    [0, 0],
    [0, 1],
  ]);
  test('count', () => {
    expect(geometry.count()).toBe(2);
  });
});
