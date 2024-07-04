import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  AreaFeature,
  GeometricPrimitive,
  Layer,
  type PointCollection,
} from '@envisim/geojson-utils';

import {SampleBaseOptions} from '../../src/sample-continuous/options.js';
import {sampleStratified} from '../../src/sample-continuous/stratified.js';

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
      createPolygon(1),
      createPolygon(1),
      createPolygon(2),
      createPolygon(3),
    ]),
    propRecord,
  );

  test('sampleStratified correct length', () => {
    const sample = sampleStratified(sampleTest, baseLayer, {
      stratify: 'prop-name',
      options: {},
    });

    expect(sample.collection.features.length).toBe(4);
  });
});
