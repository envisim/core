import {
  intermediateOnSegment,
  lengthOfSegment,
  GeoJSON as GJ,
} from '../src/index.js';

describe('intermediateOnSegment', () => {
  const p1: GJ.Position = [0, 0];
  const p2: GJ.Position = [1, 1];

  const p12 = intermediateOnSegment(p1, p2, 0.5);
  const l1 = lengthOfSegment(p1, p12);
  const l2 = lengthOfSegment(p12, p2);
  test('intermediateOnSegment', () => {
    expect(l1).toBeCloseTo(l2, 2);
  });
});
