import {intermediate, GeoJSON as GJ} from '../src/index.js';

describe('intermediate', () => {
  const p1: GJ.Position = [0, 0];
  const p2: GJ.Position = [2, 0];

  test('intermediate', () => {
    expect(intermediate(p1, p2, 0.5)).toStrictEqual([1, 0]);
  });
});
