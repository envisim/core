import {forwardAzimuth} from '../src/forwardAzimuth.js';
import type * as GJ from '../src/geojson/types.js';
describe('forwardAzimuth', () => {
  const p1: GJ.Position = [0, 0];
  const p2: GJ.Position = [0, 1];
  const p3: GJ.Position = [0, -1];
  const p4: GJ.Position = [1, 0];
  const p5: GJ.Position = [-1, 0];

  test('forwardAzimuth', () => {
    expect(forwardAzimuth(p1, p2)).toBe(0);
    expect(forwardAzimuth(p1, p3)).toBe(180);
    expect(forwardAzimuth(p1, p4)).toBe(90);
    expect(forwardAzimuth(p1, p5)).toBe(-90);
  });
});
