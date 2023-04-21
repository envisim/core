import {count} from '../src/count.js';

describe('count', () => {
  const geometry: GeoJSON.Geometry = {
    type: 'MultiPoint',
    coordinates: [
      [0, 0],
      [0, 1],
    ],
  };
  test('count', () => {
    expect(count(geometry)).toBe(2);
  });
});
