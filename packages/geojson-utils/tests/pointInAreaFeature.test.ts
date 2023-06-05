import {AreaFeature, GeoJSON as GJ, pointInAreaFeature} from '../src/index.js';

describe('pointInAreaFeature', () => {
  // polygon
  const polygon = new AreaFeature({
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
  });

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

  //console.log(polygon.getBBox());

  test('pointInAreaFeature', () => {
    expect(pointInAreaFeature(point1, polygon)).toBe(true);
    expect(pointInAreaFeature(point2, polygon)).toBe(false);
    expect(pointInAreaFeature(point3, polygon)).toBe(true);
    expect(pointInAreaFeature(point4, polygon)).toBe(true);
    expect(pointInAreaFeature(point5, polygon)).toBe(false);
  });
});
