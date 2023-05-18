import {positionInBBox} from '../src/bbox.js';
import type * as GJ from '../src/geojson/types.js';

describe('positionInBBox', () => {
  // bbox
  const box: GJ.BBox = [0, 0, 1, 1];

  // inside
  const point1: GJ.Position = [0.5, 0.5];

  // outside
  const point2: GJ.Position = [5, 0.5];

  // on vertex
  const point3: GJ.Position = [0, 0];

  // on edge
  const point4: GJ.Position = [0, 0.5];

  // outside
  const point5: GJ.Position = [1.000001, 1.000001];

  test('positionInBBox', () => {
    expect(positionInBBox(point1, box)).toBe(true);
    expect(positionInBBox(point2, box)).toBe(false);
    expect(positionInBBox(point3, box)).toBe(true);
    expect(positionInBBox(point4, box)).toBe(true);
    expect(positionInBBox(point5, box)).toBe(false);
  });
});
