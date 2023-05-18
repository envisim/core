import {positionInAreaFeature} from '../src/pointInPolygon.js';
import type * as GJ from '../src/geojson/types.js';
import {AreaFeature} from '../src/geojson/areas/ClassAreaFeature.js';
describe('positionInAreaFeature', () => {
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

  test('positionInAreaFeature', () => {
    expect(positionInAreaFeature(point1, polygon)).toBe(true);
    expect(positionInAreaFeature(point2, polygon)).toBe(false);
    expect(positionInAreaFeature(point3, polygon)).toBe(true);
    expect(positionInAreaFeature(point4, polygon)).toBe(true);
    expect(positionInAreaFeature(point5, polygon)).toBe(false);
  });
});
