import {positionInBBox, bboxInBBox} from '../src/bbox.js';
import type * as GJ from '../src/geojson/types.js';
import {Polygon} from '../src/geojson/areas/ClassPolygon';

describe('bbox', () => {
  // test.todo('Write more tests');
  // polygon
  const polygon = Polygon.create([
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 0],
    ],
  ]);
  // the bounding box
  const box: GJ.BBox = [0, 0, 1, 1];
  // inside box
  const p1: GJ.Position = [0.5, 0.5];
  // outside box
  const p2: GJ.Position = [5, 0.5];
  // edge
  const p3: GJ.Position = [0, 0.5];
  // vertex
  const p4: GJ.Position = [0, 0];

  const box2: GJ.BBox = [-1, -1, 0.5, 0.5];
  const box3: GJ.BBox = [-1, -1, -0.5, -0.5];

  test('bbox', () => {
    expect(polygon.getBBox()).toStrictEqual(box);
  });

  test('pointInBbox', () => {
    expect(positionInBBox(p1, box)).toBe(true);
    expect(positionInBBox(p2, box)).toBe(false);
    expect(positionInBBox(p3, box)).toBe(true);
    expect(positionInBBox(p4, box)).toBe(true);
  });

  test('bboxInBBox', () => {
    expect(bboxInBBox(box, box2)).toBe(true);
    expect(bboxInBBox(box, box3)).toBe(false);
  });
});
