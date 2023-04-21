import {intersectPolygonPolygonFeatures} from '../src/intersectPolygonPolygonFeatures.js';

describe('intersectPolygonPolygonFeatures', () => {
  // polygon
  const polygon1: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-0.5, -0.5],
          [0.5, -0.5],
          [0.5, 0.5],
          [-0.5, 0.5],
          [-0.5, -0.5],
        ],
      ],
    },
    properties: {},
  };
  const polygon2: GeoJSON.Feature = {
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
  const intersect = intersectPolygonPolygonFeatures(polygon1, polygon2);
  //console.log(JSON.stringify(intersect, null, 2));
  test('intersectPolygonPolygonFeatures', () => {
    //expect(area(polygon)).toBeCloseTo(13662703680020.13, 1);
  });
});
