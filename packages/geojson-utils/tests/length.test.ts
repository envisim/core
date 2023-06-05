import {LineString, GeoJSON as GJ} from '../src/index.js';

describe('length', () => {
  const p1: GJ.Position = [0, 90]; // North pole
  const p2: GJ.Position = [0, 0]; // Equator
  // Distance in meters between the north pole and the equator for WGS84
  // https://en.wikipedia.org/wiki/Latitude
  const d12 = 10001965.729;

  const line = LineString.create([p1, p2]);

  test('length', () => {
    expect(line.length()).toBeCloseTo(d12, 2);
  });
});
