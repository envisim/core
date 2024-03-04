import {describe, expect, test} from 'vitest';

import {GeoJSON as GJ, Segment, intersectSegments} from '../src/index.js';
import './_equalArrays.testf';

describe('intersectSegments', () => {
  const seg1: [GJ.Position, GJ.Position] = [
    [0, 0],
    [1, 0],
  ];
  const seg2: [GJ.Position, GJ.Position] = [
    [0.5, -1],
    [0.5, 1],
  ];

  // intersection point should be close to [0.5, 0]
  test('intersectSegments', () => {
    const intersection = intersectSegments(seg1, seg2) as GJ.PositionXY;
    expect(Array.isArray(intersection)).toBe(true);
    expect(intersection).arrayToAlmostEqual([0.5, 0.0], 1e-9);

    const intersection2 = intersectSegments(seg1, seg1);
    expect(intersection2).toBe(null);
  });
});

describe('Segment', () => {
  const seg1: [GJ.Position, GJ.Position] = [
    [0, 0],
    [1, 0],
  ];
  const seg2: [GJ.Position, GJ.Position] = [
    [0.5, -1],
    [0.5, 1],
  ];

  const seg = new Segment(seg1[0], seg1[1]);

  test('intersect', () => {
    const intersection = seg.intersect(seg2[0], seg2[1]) as GJ.PositionXY;
    expect(Array.isArray(intersection)).toBe(true);
    expect(intersection).arrayToAlmostEqual([0.5, 0.0], 1e-9);
  });
});
