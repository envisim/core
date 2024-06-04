import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  AreaFeature,
  GeoJSON,
  Layer,
} from '@envisim/geojson-utils';

import {pointFeature, squareAreaFeature} from '../src/modelFeature.js';
import {sampleFeaturesOnAreas} from '../src/sampleFeaturesOnAreas.js';

describe('sampleFeaturesOnAreas', () => {
  const polygon: GeoJSON.Polygon = {
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
  const collection = AreaCollection.create([AreaFeature.create(polygon, {})]);
  const frame = new Layer(collection, {});
  const tract = squareAreaFeature(10);
  const sample = sampleFeaturesOnAreas(frame, {
    method: 'independent',
    sampleSize: 10,
    modelFeature: tract,
  });
  //console.log(JSON.stringify(sample, null, 2));

  const tract2 = pointFeature();
  const sample2 = sampleFeaturesOnAreas(frame, {
    method: 'independent',
    sampleSize: 10,
    modelFeature: tract2,
  });
  //console.log(JSON.stringify(sample2, null, 2));

  test('sampleFeaturesOnAreas', () => {
    expect(sample.collection.features.length).toBe(10);
    expect(sample2.collection.features.length).toBe(10);
  });
});
