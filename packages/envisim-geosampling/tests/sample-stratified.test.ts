import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  AreaFeature,
  GeometricPrimitive,
  Layer,
  type PointCollection,
} from '@envisim/geojson-utils';

import {SampleBaseOptions} from '../src/sample-continuous/options.js';
import {sampleFinite} from '../src/sample-finite/sample-finite.js';
import {sampleStratified} from '../src/sample-stratified.js';

function sampleTest(
  _1: Layer<AreaCollection>,
  _2: SampleBaseOptions,
): Layer<PointCollection> {
  return Layer.createLayer(
    {
      features: [
        {
          type: 'Feature',
          geometry: {type: 'Point', coordinates: [0, 0]},
          properties: {},
        },
      ],
    },
    GeometricPrimitive.POINT,
  );
}

describe('sampleStratified', () => {
  const createPolygon = (prop: number) =>
    AreaFeature.create(
      {
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
          ],
        ],
      },
      {'prop-name': prop},
    );
  const propRecord = {
    'prop-name': {
      id: 'prop-name',
      name: 'prop-name',
      values: ['a', 'b', 'c', 'd'],
      type: 'categorical' as const,
    },
  };

  const baseLayer = new Layer(
    AreaCollection.create([
      createPolygon(0),
      createPolygon(0),
      createPolygon(0),
      createPolygon(1),
      createPolygon(1),
      createPolygon(2),
      createPolygon(3),
    ]),
    propRecord,
  );

  test('sampleContinuousStratified correct length', () => {
    const sample = sampleStratified(sampleTest, baseLayer, {
      stratify: 'prop-name',
      options: {},
    });

    expect(sample.collection.features.length).toBe(4);
  });

  test('sampleFiniteStratified correct length', () => {
    const sample = sampleStratified(sampleFinite, baseLayer, {
      stratify: 'prop-name',
      options: [
        {
          methodName: 'srswr',
          sampleSize: 2,
        },
        {
          methodName: 'srswr',
          sampleSize: 1,
        },
        {
          methodName: 'srswr',
          sampleSize: 1,
        },
        {
          methodName: 'srswr',
          sampleSize: 1,
        },
      ],
    });

    expect(sample.collection.features.length).toBe(5);

    const propSums = [0, 0, 0, 0];
    sample.collection.features.forEach((f) => {
      propSums[f.properties['prop-name']]++;
    });

    expect(propSums[0]).toBe(2);
    expect(propSums[1]).toBe(1);
    expect(propSums[2]).toBe(1);
    expect(propSums[3]).toBe(1);
  });
});
