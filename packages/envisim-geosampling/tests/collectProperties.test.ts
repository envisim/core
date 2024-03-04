import {describe, expect, test} from 'vitest';

import {
  AreaCollection,
  AreaFeature,
  GeoJSON,
  IPropertyRecord,
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
  const base = PointCollection.create([PointFeature.create(point, {size: 25})]);
  const propRec: IPropertyRecord = {
    size: {id: 'size', name: 'size', type: 'numerical'},
  };
  const collected = collectProperties(frame, base, propRec);
  //console.log(JSON.stringify(collected.properties, null, 2));
  //console.log(JSON.stringify(frame, null, 2));
  type HTvalue = {
    value: number;
    name: string;
  };

  let HT: Record<string, HTvalue> = {};
  for (let prop in collected.properties) {
    HT[prop] = {value: 0, name: collected.properties[prop].name + ''};
    frame.features.forEach((feature) => {
      let fp = feature.properties;
      if (fp._designWeight && HT[prop]) {
        HT[prop].value += fp[prop] * fp._designWeight;
      }
    });
  }
  // console.log(JSON.stringify(HT, null, 2));
  let HTresult = 0;
  for (let prop in collected.properties) {
    HTresult = HT[prop].value;
  }
  test('collectProperties', () => {
    expect(HTresult).toBeCloseTo(25, 8);
  });
});
