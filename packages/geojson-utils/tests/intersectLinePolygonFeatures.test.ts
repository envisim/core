import {intersectLinePolygonFeatures} from '../src/intersectLinePolygonFeatures.js';

describe('intersectLinePolygonFeatures', () => {
  // polygon
  const polygon: GeoJSON.Feature = {
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

  const line: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [-2, 0],
        [-0.5, 0],
        [0, 0.1],
        [0.1, 0],
        [0.4, 0],
        [0.5, 0],
        [2, 0],
      ],
    },
    properties: {},
  };

  const intersection = intersectLinePolygonFeatures(line, polygon);
  let coords = [
    [2, 2],
    [3, 3],
    [3, 3],
    [3, 3],
    [3, 3],
  ];
  if (intersection.geoJSON) {
    if (intersection.geoJSON.geometry.type === 'LineString') {
      coords = intersection.geoJSON.geometry.coordinates;
      // console.log(JSON.stringify(intersection.geoJSON, null, 2));
      // console.log(coords);
      // expected coords are [[-0.5,0],[0.5,0]]
    }
  }
  test('intersectLinePolygonFeatures', () => {
    expect(coords[0][0]).toBeCloseTo(-0.5, 3);
    expect(coords[0][1]).toBeCloseTo(0, 3);
    expect(coords[4][0]).toBeCloseTo(0.5, 3);
    expect(coords[4][1]).toBeCloseTo(0, 3);
  });
});
