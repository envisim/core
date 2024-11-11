import {expect, test} from 'vitest';

import {
  type AreaObject,
  Feature,
  FeatureCollection,
  type PointObject,
  Polygon,
} from '@envisim/geojson-utils';

import {SampleBaseOptions} from '../src/sample-continuous/options.js';
import {sampleFinite} from '../src/sample-finite/sample-finite.js';
import {sampleStratified} from '../src/sample-stratified.js';

function sampleTest(
  _1: FeatureCollection<AreaObject>,
  _2: SampleBaseOptions,
): FeatureCollection<PointObject> {
  return FeatureCollection.createPointFromJson({
    features: [
      {
        type: 'Feature',
        geometry: {type: 'Point', coordinates: [0, 0]},
        properties: {},
      },
    ],
  });
}

const createPolygon = (prop: number) =>
  new Feature(
    Polygon.create([
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    ]),
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

const baseCollection = FeatureCollection.newArea(
  [0, 0, 0, 1, 1, 2, 3].map(createPolygon),
  propRecord,
  true,
);

test('sampleContinuousStratified correct length', () => {
  const sample = sampleStratified(sampleTest, baseCollection, {
    stratify: 'prop-name',
    options: {},
  });

  expect(sample.features.length).toBe(4);
});

test('sampleFiniteStratified correct length', () => {
  const sample = sampleStratified(sampleFinite, baseCollection, {
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

  expect(sample.features.length).toBe(5);

  const propSums = [0, 0, 0, 0];
  sample.forEach((f) => {
    propSums[f.properties['prop-name']]++;
  });

  expect(propSums[0]).toBe(2);
  expect(propSums[1]).toBe(1);
  expect(propSums[2]).toBe(1);
  expect(propSums[3]).toBe(1);
});
