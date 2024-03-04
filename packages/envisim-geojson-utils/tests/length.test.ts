import {describe, expect, test} from 'vitest';

import {GeoJSON as GJ, LineString} from '../src/index.js';

describe('length', () => {
  let p1: GJ.Position = [0, 90]; // North pole
  let p2: GJ.Position = [0, 0]; // Equator
  // Distance in meters between the north pole and the equator for WGS84
  // https://en.wikipedia.org/wiki/Latitude
  const d12 = 10001965.729;

  const line = LineString.create([p1, p2], false);

  test('length', () => {
    expect(line.length()).toBeCloseTo(d12, 2);
  });
});
