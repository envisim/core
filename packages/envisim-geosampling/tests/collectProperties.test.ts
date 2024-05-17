import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  AreaFeature,
  GeoJSON,
  IPropertyRecord,
  Layer,
  PointCollection,
  PointFeature,
} from '@envisim/geojson-utils';

import {collectProperties} from '../src/collectProperties.js';

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
  const framePropertyRecord: IPropertyRecord = {
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
  const propRec: IPropertyRecord = {
    size: {id: 'size', name: 'size', type: 'numerical'},
    class: {
      id: 'class',
      name: 'class',
      type: 'categorical',
      values: ['forest'],
    },
  };
  const baseLayer = new Layer(base, propRec, true);

  const newLayer = collectProperties(frameLayer, baseLayer, propRec);

  //console.log(JSON.stringify(newLayer, null, 2));

  test('collectProperties', () => {
    expect(Object.keys(newLayer.propertyRecord).length).toBe(3);
  });
});
