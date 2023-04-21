import {forwardAzimuth} from '../src/forwardAzimuth.js';

describe('forwardAzimuth', () => {
  const p1 = [0, 0];
  const p2 = [0, 1];
  const p3 = [0, -1];
  const p4 = [1, 0];
  const p5 = [-1, 0];

  test('forwardAzimuth', () => {
    expect(forwardAzimuth(p1, p2)).toBe(0);
    expect(forwardAzimuth(p1, p3)).toBe(180);
    expect(forwardAzimuth(p1, p4)).toBe(90);
    expect(forwardAzimuth(p1, p5)).toBe(-90);
  });
});
