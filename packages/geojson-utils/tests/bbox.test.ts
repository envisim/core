import {bbox, pointInBbox, bboxInBbox, addBboxes} from '../src/bbox.js';

describe('bbox', () => {
  test.todo('Write tests for addBboxes.');
  // polygon
  const polygon: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0, 0],
        ],
      ],
    },
    properties: {},
  };
  // the bounding box
  const box: GeoJSON.BBox = [0, 0, 1, 1];
  // inside box
  const p1 = [0.5, 0.5];
  // outside box
  const p2 = [5, 0.5];
  // edge
  const p3 = [0, 0.5];
  // vertex
  const p4 = [0, 0];

  const box2: GeoJSON.BBox = [-1, -1, 0.5, 0.5];
  const box3: GeoJSON.BBox = [-1, -1, -0.5, -0.5];

  test('bbox', () => {
    expect(bbox(polygon)).toStrictEqual(box);
  });

  test('pointInBbox', () => {
    expect(pointInBbox(p1, box)).toBe(true);
    expect(pointInBbox(p2, box)).toBe(false);
    expect(pointInBbox(p3, box)).toBe(true);
    expect(pointInBbox(p4, box)).toBe(true);
  });

  test('bboxInBbox', () => {
    expect(bboxInBbox(box, box2)).toBe(true);
    expect(bboxInBbox(box, box3)).toBe(false);
  });
});
