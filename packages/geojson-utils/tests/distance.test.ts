import {GeoJSON as GJ, distance} from '../src/index.js';

describe('distance', () => {
  const p1: GJ.Position = [0, 90]; // North pole
  const p2: GJ.Position = [0, 0]; // Equator
  // Distance in meters between the north pole and the equator for WGS84
  // https://en.wikipedia.org/wiki/Latitude
  const d12 = 10001965.729;

  test('distance', () => {
    expect(distance(p1, p2)).toBeCloseTo(d12, 2);
  });
});
