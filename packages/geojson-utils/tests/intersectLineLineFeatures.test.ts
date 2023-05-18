import {intersectLineLineFeatures} from '../src/intersectLineLineFeatures.js';
import type * as GJ from '../src/geojson/types.js';

describe('intersectLineLineFeatures', () => {
  const line1: GJ.LineFeature = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [-2, 0],
        [2, 0],
      ],
    },
    properties: {},
  };
  const line2: GJ.LineFeature = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [0, -1],
        [0, 1],
      ],
    },
    properties: {},
  };

  const intersection = intersectLineLineFeatures(line1, line2);
  let coords: GJ.Position = [3, 3];
  if (intersection.geoJSON) {
    if (intersection.geoJSON.geometry.type === 'Point') {
      coords = intersection.geoJSON.geometry.coordinates;
      //console.log(intersection);
      //console.log(coords);
      // expected coords are [0,0]
    }
  }
  test('intersectLineLineFeatures', () => {
    expect(coords[0]).toBeCloseTo(0, 3);
    expect(coords[1]).toBeCloseTo(0, 3);
  });
});
