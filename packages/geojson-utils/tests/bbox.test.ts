import type * as GJ from '../src/geojson/types.js';
import {
  pointInBBox,
  bboxInBBox,
  unionOfBBoxes,
  bboxFromPositions,
} from '../src/bbox.js';
import {Polygon} from '../src/geojson/areas/ClassPolygon';
import './_equalArrays.testf';

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

  test('pointInBBox', () => {
    expect(pointInBBox(p1, box)).toBe(true);
    expect(pointInBBox(p2, box)).toBe(false);
    expect(pointInBBox(p3, box)).toBe(true);
    expect(pointInBBox(p4, box)).toBe(true);
  });

  test('bboxInBBox', () => {
    expect(bboxInBBox(box, box2)).toBe(true);
    expect(bboxInBBox(box, box3)).toBe(false);
  });

  test('union of bboxes', () => {
    let bboxes: GJ.BBox[] = [
      [-170, -10, -110, 10],
      [-160, -10, -150, 15],
      [-165, -20, -10, -120, 10, 10],
    ];
    expect(unionOfBBoxes(bboxes)).arrayToEqual([-170, -20, -10, -110, 15, 10]);

    bboxes = [
      [-170, -10, -110, 10],
      [-150, -10, -100, 10],
      [-165, -10, -155, 10],
    ];
    expect(unionOfBBoxes(bboxes)).arrayToEqual([-170, -10, -100, 10]);

    bboxes = [
      [-170, -10, -110, 20],
      [-120, -10, 20, 10],
      [50, -50, -180, 10],
    ];
    expect(unionOfBBoxes(bboxes)).arrayToEqual([50, -50, 20, 20]);
  });

  test('bbox from positions', () => {
    let positions: GJ.Position[] = [
      [-58, -63],
      [-74, -72],
      [-102, -71],
      [-102, -74],
      [-131, -74],
      [-163, -77],
      [163, -77],
      [172, -71],
      [140, -65],
      [113, -65],
      [-4, -70],
      [-14, -71],
      [-33, -77],
      [-46, -77],
      [-61, -74],
      [-58, -63],
    ];
    expect(bboxFromPositions(positions)).arrayToEqual([113, -77, -4, -63]);
  });
});
