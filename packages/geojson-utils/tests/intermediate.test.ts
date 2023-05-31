import type * as GJ from '../src/geojson/types.js';
import {intermediate} from '../src/intermediate.js';

describe('intermediate', () => {
  const p1: GJ.Position = [0, 0];
  const p2: GJ.Position = [2, 0];

  test('intermediate', () => {
    expect(intermediate(p1, p2, 0.5)).toStrictEqual([1, 0]);
  });
});
