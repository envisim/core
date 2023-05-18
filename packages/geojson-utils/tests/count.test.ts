import type * as GJ from '../src/geojson/types.js';
import {MultiPoint} from '../src/geojson/points/ClassMultiPoint.js';

describe('count', () => {
  const geometry = MultiPoint.create([
    [0, 0],
    [0, 1],
  ]);
  test('count', () => {
    expect(geometry.count()).toBe(2);
  });
});
