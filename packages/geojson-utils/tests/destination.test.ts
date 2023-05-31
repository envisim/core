import type * as GJ from '../src/geojson/types.js';
import {destination} from '../src/destination.js';

describe('destination', () => {
  const p1: GJ.Position = [0, 90]; // North pole
  const azimuth = 180;
  // Distance in meters between the north pole and the equator for WGS84
  // https://en.wikipedia.org/wiki/Latitude
  const d12 = 10001965.729;
  const p2 = destination(p1, d12, azimuth); // p2 should be close to [0,0]
  test('destination', () => {
    expect(p2[0]).toBeCloseTo(0, 4);
    expect(p2[1]).toBeCloseTo(0, 4);
  });
});
