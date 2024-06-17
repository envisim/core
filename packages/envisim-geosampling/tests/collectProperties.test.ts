import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  AreaFeature,
  GeoJSON,
  Layer,
  PointCollection,
  PointFeature,
  PropertyRecord,
} from '@envisim/geojson-utils';

import {
  collectProperties,
  collectPropertyRecord,
} from '../src/collectProperties.js';

describe('samplePointsOnAreas', () => {
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
  const point: GeoJSON.Point = {
    type: 'Point',
    coordinates: [0.5, 0.5],
  };
  const frame = AreaCollection.create([
    AreaFeature.create(polygon, {_designWeight: 1}),
  ]);
  const framePropertyRecord: PropertyRecord = {
    _designWeight: {
      id: '_designWeight',
      name: '_designWeight',
      type: 'numerical',
    },
  };
  const frameLayer = new Layer(frame, framePropertyRecord, true);

  const base = PointCollection.create([
    PointFeature.create(point, {size: 25, class: 0}),
  ]);
  const propRec: PropertyRecord = {
    size: {id: 'size', name: 'size', type: 'numerical'},
    class: {
      id: 'class',
      name: 'class',
      type: 'categorical',
      values: ['forest'],
    },
  };
  const baseLayer = new Layer(base, propRec, true);

  const propRecToCollect = collectPropertyRecord(propRec, ['size', 'class']);
  const newLayer = collectProperties(frameLayer, baseLayer, propRecToCollect);

  //console.log(JSON.stringify(newLayer, null, 2));

  test('collectProperties', () => {
    expect(Object.keys(newLayer.propertyRecord).length).toBe(3);
  });
});
