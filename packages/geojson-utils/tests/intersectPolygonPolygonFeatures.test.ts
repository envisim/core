import {intersectPolygonPolygonFeatures} from '../src/intersectPolygonPolygonFeatures.js';
import {area} from '../src/area.js';
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
  const polygon3: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [0.5, 0],
          [0.5, 0.5],
          [0, 0.5],
          [0, 0],
        ],
      ],
    },
    properties: {},
  };
  const intersect = intersectPolygonPolygonFeatures(polygon1, polygon2);

  //console.log(JSON.stringify(intersect, null, 2));
  test('intersectPolygonPolygonFeatures', () => {
    if (!intersect.geoJSON) {
      throw new Error('No intersect.');
    }
    expect(area(intersect.geoJSON)).toBeCloseTo(area(polygon3), 4);
  });
});
