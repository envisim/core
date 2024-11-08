import {expect, test} from 'vitest';

import {Layer} from '../../src/geojson/layers/class-layer.js';
import {AreaObject, FeatureCollection, GeoJSON as GJ} from '../../src/index.js';

const ring: GJ.Position[] = [
  [12.888806360606111, 61.4879814554327],
  [16.389604974232412, 62.03272898392305],
  [18.647276634218542, 63.86015271397079],
  [12.751410965460195, 63.53080548838537],
  [12.888806360606111, 61.4879814554327],
];
const poly: GJ.Polygon = {
  type: 'Polygon',
  coordinates: [ring],
};
const line: GJ.LineString = {
  type: 'LineString',
  coordinates: ring,
};
const feature1: GJ.BaseFeature<GJ.Geometry, any> = {
  type: 'Feature',
  geometry: poly,
  properties: {
    a: 'stringValue1',
    b: 1,
    _designWeight: 0.5,
  },
};
const feature2: GJ.BaseFeature<GJ.Geometry, any> = {
  type: 'Feature',
  geometry: line,
  properties: {
    a: 'stringValue2',
    b: 2,
    _designWeight: 0.5,
  },
};
const collection: GJ.FeatureCollection = {
  type: 'FeatureCollection',
  features: [feature1, feature2],
};

const layer = Layer.createArea(collection);

test('Layer', () => {
  expect(FeatureCollection.isArea(layer.collection)).toBe(true);
  expect(Layer.isArea(layer)).toBe(true);
});

test('appendFromLayer', () => {
  const layer_area = Layer.newArea(layer.collection, layer.propertyRecord);
  const layer_line = Layer.newLine(
    FeatureCollection.createLine([feature2 as GJ.LineFeature, feature2 as GJ.LineFeature]),
    layer.propertyRecord,
  );
  expect(() => layer_area.appendFromLayer(layer)).not.toThrowError();
  expect(() =>
    layer_area.appendFromLayer(layer_line as unknown as Layer<AreaObject>),
  ).toThrowError();
});

test('appendFromLayerWithDifferentProps', () => {
  const layer_area = Layer.createArea(collection);
  expect(() => layer_area.appendFromLayer(layer)).toThrowError();
});
