import {describe, expect, test} from 'vitest';

import {
  type GeoJSON as GJ,
  Layer,
  Point,
  PointCollection,
  PointFeature,
} from '@envisim/geojson-utils';

import {sampleFinite} from '../../src/sampling/sample-finite.ts';

describe('sampleFinite', () => {
  // Create a layer with N random points
  const N = 1000;
  const points: PointFeature[] = [];

  for (let i = 0; i < N; i++) {
    const coordinates: GJ.Position = [
      180 - Math.random() * 360,
      90 - Math.random() * 180,
    ];
    points.push(PointFeature.create(Point.create(coordinates)));
  }
  const layer = new Layer(PointCollection.create(points, true), {}, true);

  // Select sample
  const sample = sampleFinite(layer, {
    methodName: 'lpm2',
    sampleSize: 10,
    spreadGeo: true,
  });

  //console.log(JSON.stringify(sample, null, 2));

  test('sampleFinite', () => {
    expect(sample.collection.size).toBe(10);
  });
});
