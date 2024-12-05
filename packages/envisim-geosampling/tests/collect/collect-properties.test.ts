import {expect, test} from 'vitest';

import {Feature, FeatureCollection, Point, Polygon, PropertyRecord} from '@envisim/geojson-utils';

import {collectProperties, collectPropertyRecord} from '../../src/collect/collect-properties.js';

const polygon = Polygon.create([
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ],
]);
const point = Point.create([0.5, 0.5]);

const frame = FeatureCollection.newArea([new Feature(polygon, {_designWeight: 1})]);
frame.propertyRecord.addDesignWeight();

const propRec = new PropertyRecord({
  size: {id: 'size', name: 'size', type: 'numerical'},
  class: {
    id: 'class',
    name: 'class',
    type: 'categorical',
    values: ['forest'],
  },
});
const base = FeatureCollection.newPoint([new Feature(point, {size: 25, class: 0})], propRec);

const propRecToCollect = collectPropertyRecord(propRec, ['size', 'class']);

test('collectProperties', () => {
  const newCollection = collectProperties(frame, base, propRecToCollect);
  expect(Object.keys(newCollection.propertyRecord.record).length).toBe(3);
});
