import {toFeatureCollection} from '@envisim/geojson-utils';
import {
  sampleTractsOnAreas,
  squareAreaTract,
  pointTract,
} from '@envisim/geosampling';

describe('sampleTractsOnAreas', () => {
  const polygon: GeoJSON.Geometry = {
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
  };
  const frame = toFeatureCollection(polygon);
  const tract = squareAreaTract(10);
  const sample = sampleTractsOnAreas(frame, {
    method: 'uniform',
    sampleSize: 10,
    modelTract: tract,
  });
  //console.log(JSON.stringify(sample, null, 2));

  const tract2 = pointTract();
  const sample2 = sampleTractsOnAreas(frame, {
    method: 'uniform',
    sampleSize: 10,
    modelTract: tract2,
  });
  //console.log(JSON.stringify(sample2, null, 2));

  test('sampleTractsOnAreas', () => {
    expect(sample.features.length).toBe(10);
    expect(sample2.features.length).toBe(10);
  });
});
