import {length} from '../src/length.js';

describe('length', () => {
  const p1 = [0, 90]; // North pole
  const p2 = [0, 0]; // Equator
  // Distance in meters between the north pole and the equator for WGS84
  // https://en.wikipedia.org/wiki/Latitude
  const d12 = 10001965.729;

  const line: GeoJSON.Geometry = {
    type: 'LineString',
    coordinates: [p1, p2],
  };

  test('length', () => {
    expect(length(line)).toBeCloseTo(d12, 2);
  });
});
